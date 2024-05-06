import "./index.css";
import { Alert, Button, Input, Select, Space } from "@jundao/design";
import { Show, createMemo, createResource, createSignal } from "solid-js";
import type { Enterprise, User } from "../../context";

const AddUser = () => {
	const [newUser, setNewUser] = createSignal<User>({ email: "", role: "user" });
	const [enterprise, setEnterprise] = createSignal<string>();
	const [isSubmitting, setIsSubmitting] = createSignal(false);
	const [invalid, setInvalid] = createSignal(false);
	const [error, setError] = createSignal<string>();
	const [success, setSuccess] = createSignal<string>();
	const [enterprises, { refetch }] = createResource<
		Array<Enterprise> | undefined
	>(async () => {
		const result = await fetch("/api/enterprises");
		if (result.status !== 200) return undefined;
		return result.json() as Promise<Array<Enterprise>>;
	});
	const enterpriseId = createMemo<number | undefined>(() => {
		if (enterprises()) {
			const ent = enterprises()?.find((ent) => ent.name === enterprise());
			return ent ? ent.id : undefined;
		}
		return undefined;
	});

	const isValidEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(newUser().email);
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		!setError();
		!setSuccess();

		if (!isValidEmail()) {
			setInvalid(true);
			setIsSubmitting(false);
			return;
		}

		if (newUser().role === "enterprise" && !enterprise()) {
			setError(
				"Pas d'enterprise sélectionnée pour un utilisateur 'enterprise'.",
			);
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(
					enterprise()
						? {
								email: newUser().email,
								username: newUser().email.split("@")[0],
								role: newUser().role,
								enterprise_id: enterprise() ? enterpriseId() : null,
							}
						: {
								email: newUser().email,
								username: newUser().email.split("@")[0],
								role: newUser().role,
							},
				),
			});

			if (response.ok) {
				setSuccess("Utilisateur créé avec succès !");
				setEnterprise(undefined);
				setNewUser({ email: "", role: "user" });
			}
		} catch (error) {
			setError(`Error adding user: ${error.message}`);
		}
		setIsSubmitting(false);
	};

	return (
		<div class="container">
			<Space vertical>
				<Space wrap align="center">
					<Input
						label="Email"
						class="input"
						type="email"
						placeholder="nomprenom@gmail.com"
						value={newUser().email}
						onChange={(newEmail) => {
							setNewUser((prev) => ({ ...prev, email: newEmail }));
							setInvalid(false);
						}}
						invalid={invalid()}
						errorMessage={"Adresse email invalide"}
						required
					/>
					<Select
						label="Rôle"
						value={newUser().role}
						options={["user", "enterprise", "admin"]}
						onChange={(newRole) =>
							setNewUser((prev) => ({ ...prev, role: newRole }))
						}
					/>
					<Show when={newUser().role === "enterprise" && enterprises()}>
						<Select
							label="Entreprise"
							placeholder="Pas d'entreprise"
							value={enterprise()}
							options={enterprises().map((ent) => ent.name)}
							onChange={setEnterprise}
						/>
					</Show>
				</Space>

				<Show when={success()}>
					<Alert type="success" closable message={success()} />
				</Show>
				<Show when={error()}>
					<Alert type="error" closable message={error()} />
				</Show>

				<Button
					type="primary"
					onClick={handleSubmit}
					disabled={isSubmitting()}
					loading={isSubmitting()}
				>
					Ajouter l'utilisateur
				</Button>
			</Space>
		</div>
	);
};

export default AddUser;
