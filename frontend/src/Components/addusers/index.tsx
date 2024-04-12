import { createSignal } from "solid-js";
import styles from "./AddUser.module.css";

const AddUser = () => {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [role, setRole] = createSignal("user");
    const [error, setError] = createSignal(null);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleRoleChange = (e) => setRole(e.target.value);

	const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: email().split("@")[0], // Utiliser la partie avant le @ comme nom d'utilisateur
                email: email(),
                password: password(),
                role: role(),
            }),
        });

        if (!response.ok) {
			throw new Error("Failed to create user");
		}

		console.log("User created successfully");
		setEmail("");
		setPassword("");
		setRole("user");
	} catch (error) {
		setError("Failed to create user: " + error.message);
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
				<div>
					<label class={styles.label} for="password-input">
						Mot de passe
					</label>
					<input
						class={styles.input}
						id="password-input"
						type="password"
						placeholder="Mot de passe"
						value={password()}
						onInput={handlePasswordChange}
						required
					/>
				</div>
				<div>
					<label class={styles.label} for="role-input">
						Rôle
					</label>
					<select
						class={styles.input}
						id="role-input"
						value={role()}
						onInput={handleRoleChange}
						>
						<option value="user">Utilisateur</option>
						<option value="enterprise">Entreprise</option>
					</select>
				</div>
				{error() && <div class={styles.error}>{error()}</div>}
				<button class={styles.button} type="submit">
					Ajouter l'utilisateur
				</button>
			</form>
		</div>
		);
};

export default AddUser;