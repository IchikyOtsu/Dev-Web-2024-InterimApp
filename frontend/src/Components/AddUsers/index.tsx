import { Button, Card, Input, Text } from "@jundao/design";
import { createSignal } from "solid-js";
import "./AddUser.css";

const AddUser = () => {
	const [email, setEmail] = createSignal("");
	const [role, setRole] = createSignal("user");
	const [error, setError] = createSignal(null);
	const [success, setSuccess] = createSignal(null);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const isValidEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (!isValidEmail()) {
			setError("Veuillez entrer une adresse email valide.");
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

			setSuccess("Utilisateur créé avec succès !");
			setEmail("");
			setRole("user");
		} catch (error) {
			setError(`Échec de la création de l'utilisateur : ${error.message}`);
		}
	};

	return (
		<Card class="profileCard">
			<div class="leftSection">
				<img
					src="../../assets/avatar.jpg"
					alt="Profile"
					class="profilePicture"
				/>
			</div>
			<form class="form" onSubmit={handleSubmit}>
				<div>
					<Text class="label">Adresse mail</Text>
					<Input
						class="input"
						id="email-input"
						type="email"
						placeholder="nomprenom@gmail.com"
						value={email()}
						onInput={handleEmailChange}
						required
					/>
				</div>

				{error() && <div class="error">{error()}</div>}
				{success() && <div class="success">{success()}</div>}
				<Button class="button" type="primary" onClick={(e) => handleSubmit(e)}>
					Ajouter l'utilisateur
				</Button>
			</form>
		</Card>
	);
};

export default AddUser;
