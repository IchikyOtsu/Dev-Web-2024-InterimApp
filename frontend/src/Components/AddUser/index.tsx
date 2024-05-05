import { Alert, Button, Input, Select, Space, Text } from "@jundao/design";
import { Show, createMemo, createResource, createSignal } from "solid-js";
import "./index.css";

interface Enterprise {
	id: number;
	name: string;
	description: string;
	logo_url: string;
	website_url: string;
}

const AddUser = () => {
	const [email, setEmail] = createSignal("");
	const [role, setRole] = createSignal("user");
	const [enterprise, setEnterprise] = createSignal<string>();
	const [invalid, setInvalid] = createSignal(false);
	const [error, setError] = createSignal(false);
	const [success, setSuccess] = createSignal(false);
	const [enterprises, { refetch }] = createResource<
		Array<Enterprise> | undefined
	>(async () => {
		const result = await fetch("/api/enterprises");
		if (result.status !== 200) return undefined;
		return result.json();
	});
	const enterpriseId = createMemo<number | undefined>(() => {
		if (enterprises()) {
			const ent = enterprises().find((ent) => ent.name === enterprise());
			return ent ? ent.id : undefined;
		}
		return undefined;
	});

	const isValidEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email());
	};

	const handleSubmit = async () => {
		!setError();
		!setSuccess();

		if (!isValidEmail()) {
			setInvalid(true);
			return;
		}

		try {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: email().split("@")[0],
					email: email(),
					role: role(),
					enterprise_id: enterpriseId(),
				}),
			});

			if (response.ok) {
				setSuccess(true);
				setEmail("");
				setRole("user");
			}
		} catch (error) {
			setError(true);
		}
	};

	return (
		<div class="container">
			<Space vertical>
				<Space wrap>
					<Text>Adresse mail</Text>
					<Input
						class="input"
						type="email"
						placeholder="nomprenom@gmail.com"
						value={email()}
						onChange={(email) => {
							setEmail(email);
							setInvalid(false);
						}}
						invalid={invalid()}
						errorMessage={"Adresse email invalide"}
						required
					/>
					<Select
						label="Rôle"
						value={role()}
						options={["user", "enterprise", "admin"]}
						onChange={setRole}
					/>
					<Show when={role() === "enterprise"}>
						<Select
							as="select"
							label="Entreprise"
							placeholder="Pas d'entreprise"
							value={enterprise()}
							options={enterprises().map((ent) => ent.name)}
							onChange={setEnterprise}
						/>
					</Show>
				</Space>

				<Show when={success()}>
					<Alert
						type="success"
						closable
						message="Utilisateur créé avec succès !"
					/>
				</Show>
				<Show when={error()}>
					<Alert type="error" closable message="Une erreur est survenue" />
				</Show>

				<Button type="primary" onClick={handleSubmit}>
					Ajouter l'utilisateur
				</Button>
			</Space>
		</div>
	);
};

export default AddUser;
