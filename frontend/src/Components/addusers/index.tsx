import { Show, createSignal } from "solid-js";
import styles from "./AddUser.module.css";

const AddUser = () => {
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [showPassword, setShowPassword] = createSignal(false);
	const [role, setRole] = createSignal("user");
	const [error, setError] = createSignal(null);
	const [success, setSuccess] = createSignal(null);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleRoleChange = (e) => setRole(e.target.value);

	const toggleShowPassword = () => setShowPassword(!showPassword());

	const isValidPassword = () => {
		const passwordRegex =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]).{8,}$/;
		return passwordRegex.test(password());
	};

	const isValidEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (!isValidPassword()) {
			setError(
				"Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
			);
			return;
		}

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
					password: password(),
					role: role(),
				}),
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			setSuccess("Utilisateur créé avec succès !");
			setEmail("");
			setPassword("");
			setRole("user");
		} catch (error) {
			setError("Échec de la création de l'utilisateur : " + error.message);
		}
	};

	return (
		<div class={styles.profileCard}>
			<div class={styles.leftSection}>
				<img
					src="./src/assets/avatar.jpg"
					alt="Profile"
					class={styles.profilePicture}
				/>
			</div>
			<form class={styles.form} onSubmit={handleSubmit}>
				<div>
					<label class={styles.label} for="email-input">
						Adresse mail
					</label>
					<input
						class={styles.input}
						id="email-input"
						type="email"
						placeholder="nomprenom@gmail.com"
						value={email()}
						onInput={handleEmailChange}
						required
					/>
				</div>
				<label class={styles.label} for="password-input">
					Mot de passe
				</label>
				<div class={styles.passwordContainer}>
					<input
						class={styles.input}
						id="password-input"
						type={showPassword() ? "text" : "password"}
						placeholder="Mot de passe"
						value={password()}
						onInput={handlePasswordChange}
						required
					/>
					<button
						class={styles.togglePasswordButton}
						type="button"
						onClick={toggleShowPassword}
					>
						{showPassword() ? "Masquer" : "Afficher"}
					</button>
				</div>
				<Show when={!isValidPassword() && password().length > 0}>
					<div class={styles.passwordRules}>
						Le mot de passe doit contenir au moins 8 caractères, une majuscule,
						une minuscule, un chiffre et un caractère spécial.
					</div>
				</Show>

				{error() && <div class={styles.error}>{error()}</div>}
				{success() && <div class={styles.success}>{success()}</div>}
				<button class={styles.button} type="submit">
					Ajouter l'utilisateur
				</button>
			</form>
		</div>
	);
};

export default AddUser;
