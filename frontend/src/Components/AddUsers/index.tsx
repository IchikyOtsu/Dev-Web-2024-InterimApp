import {
	Button,
	Card,
	Input,
	Select,
	Space,
	Text,
	Title,
	Alert
} from "@jundao/design";
import {createSignal, Show} from "solid-js";
import "./AddUser.css";

const AddUser = () => {
	const [email, setEmail] = createSignal("");
	const [role, setRole] = createSignal("user");
	const [invalid, setInvalid] = createSignal(false);
	const [error, setError] = createSignal(false);
	const [success, setSuccess] = createSignal(false);

	const isValidEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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
				}),
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}
			setEmail("");
			setRole("user");
		} catch (error) {
			setError(true);
			return;
		}
		setSuccess(true);
	};

	return (
		<Card class="profileCard">
			<Space vertical>
				<Title>Nouvel Utilisateur</Title>
				<Text class="label">Adresse mail</Text>
				<Input
					class="input"
					type="email"
					placeholder="nomprenom@gmail.com"
					value={email()}
					onChange={(email) => {setEmail(email); setInvalid(false);}}
					invalid={invalid()}
					errorMessage={"Adresse email invalide"}
					required
				/>

				<Select
					label="Rôle"
					value={role()}
					options={["user", "enterprise", "admin"]}
					onChange={(role: string) => setRole(role)}
				/>

				<Show when={success()}>
					<Alert type="success" closable message="Utilisateur créé avec succès !"/>
				</Show>
				<Show when={error()}>
					<Alert type="error" closable message="Une erreur est survenue"/>
				</Show>

				<Button class="button" type="primary" onClick={handleSubmit}>
					Ajouter l'utilisateur
				</Button>
			</Space>
		</Card>
	);
};

export default AddUser;
