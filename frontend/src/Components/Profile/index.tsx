import { Button, Input, Select, Text } from "@jundao/design";

import { createSignal, onMount } from "solid-js";
import { useGlobalContext } from "../../context";
import "./index.css";
// @ts-ignore
const Profile = ({ profilePicture }) => {
	interface ProfileData {
		first_name: string;
		last_name: string;
		city: string;
		address: string;
		postal_code: string;
		email: string;
	}

	const userId = useGlobalContext().user?.id;
	const [userData, setUserData] = createSignal({});
	const [nom, setNom] = createSignal("");
	const [prenom, setPrenom] = createSignal("");
	const [competence, setCompetence] = createSignal([""]);
	const [ville, setVille] = createSignal("");
	const [codePostal, setCodePostal] = createSignal("");
	const [addresse, setAddresse] = createSignal("");
	const [document, setDocument] = createSignal([]);

	onMount(async () => {
		await fetch(`/api/profil/${userId}`)
			.then((res) => res.json())
			.then((data) => {
				setUserData(data);
				setNom(data.last_name);
				setPrenom(data.first_name);
				//				setCompetence(data.skill);
				setCodePostal(data.postal_code);
				setVille(data.city);
				setAddresse(data.address);
			})
			.catch((err) => console.error("API call failed:", err));
	});

	const handleSubmit = async () => {
		try {
			const response = await fetch(`/api/profil/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					first_name: prenom(),
					last_name: nom(),
					email: userData().email,
					//					skill: competence(),
					postal_code: codePostal(),
					city: ville(),
					address: addresse(),
					//					document: document()
				}),
			});
			if (!response.ok) {
				throw new Error(await response.text());
			}
		} catch (error) {
			return;
		}
	};

	return (
		<div class="profile-card">
			<div class="left-section">
				<img src={profilePicture} alt="Profile" class="profile-picture" />
				<Text class="text" id="text-avatar">
					NomPrénom
				</Text>
				<br />
				<Text class="text" id="text-avatar">
					nomprenom@email.com
				</Text>
			</div>
			<div class="right-section">
				<div class="input-group">
					<div id="nom">
						<Text class="text"> Nom </Text>
						<Input
							id="nom-input"
							class="input-nom"
							type="text"
							placeholder="Nom de famille"
							value={nom()}
							onChange={(nom) => setNom(nom)}
							required
						/>
					</div>
					<div id="prenom">
						<Text class="text"> Prénom </Text>
						<Input
							id="prenom-input"
							class="input-prenom"
							type="text"
							placeholder="Prénom"
							value={prenom()}
							onChange={(prenom) => setPrenom(prenom)}
							required
						/>
					</div>
				</div>
				<div id="mail">
					<Text class="text"> Adresse mail </Text>
					<Input
						id="mail-input"
						class="input-mail"
						type="email"
						placeholder="nomprenom@gmail.com"
						value={userData().email}
						required
						disabled
					/>
				</div>
				<div id="competences">
					<Text class="text"> Compétences </Text>
					<Input
						id="competences-input"
						class="input-competence"
						type="text"
						placeholder="Ex: Informatique"
						value={competence()}
						onChange={(competence) => setCompetence(competence)}
						required
					/>
				</div>
				<div class="input-group">
					<div id="code-postal">
						<Text class="text"> Code Postal </Text>
						<Input
							id="code-postal-input"
							class="input-code-postal"
							type="number"
							placeholder="9999"
							value={codePostal()}
							onChange={(codePostal) => setCodePostal(codePostal)}
							required
						/>
					</div>
					<div id="ville">
						<Text class="text"> Ville </Text>
						<Select
							id="ville-input"
							class="input-ville"
							placeholder={"Sélectionnez une ville"}
							options={["Lyon", "Bruxelles", "Leuven"]}
							value={ville()}
							onChange={(ville: string) => setVille(ville)}
							required
						/>
					</div>
				</div>
				<div id="adresse">
					<Text class="text"> Adresse </Text>
					<Input
						id="adresse-input"
						class="input-adresse"
						type="text"
						placeholder="Rue de la place, 14"
						value={addresse()}
						onChange={(addresse) => setAddresse(addresse)}
						required
					/>
				</div>
				<div id="documents">
					<Text class="text"> Documents </Text>
					<br></br>
					<input
						id="documents-input"
						class="input-documents"
						type="file"
						accept="image/png, image/jpeg"
						value={document()}
						onChange={(document) => setDocument(document)}
						multiple
						required
					/>
				</div>
				<Button
					class="send-button"
					children="Envoyer"
					type="primary"
					onClick={handleSubmit}
				/>
			</div>
		</div>
	);
};

export default Profile;
