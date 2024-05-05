import {
	Button,
	Card,
	Image,
	Input,
	Select,
	Space,
	Text,
} from "@jundao/design";

import { createSignal, onMount } from "solid-js";
import { useGlobalContext } from "../../context";
import "./index.css";

interface ProfileData {
	first_name: string;
	last_name: string;
	city: string;
	address: string;
	postal_code: string;
	email: string;
}

const Profile = () => {
	const userId = useGlobalContext().user[0]()?.id;
	const [userData, setUserData] = createSignal<ProfileData>({});
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
				method: "PUT",
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
		<Card class="profile-card" style="margin: 1rem">
			<Space align="center" wrap style="justify-content: center;">
				<Space vertical class="left-section" align="center">
					<Image
						src={profilePicture}
						alt="Profile"
						shape="circle"
						class="profile-picture"
					/>
					<Text>{`${prenom()} ${nom()}`}</Text>
					<Text>{userData().email}</Text>
				</Space>
				<Space vertical class="right-section">
					<Space wrap>
						<Space vertical>
							<Text bold> Nom </Text>
							<Input
								type="text"
								placeholder="Nom de famille"
								value={nom()}
								onChange={(nom) => setNom(nom)}
								required
							/>
						</Space>
						<Space vertical>
							<Text bold> Prénom </Text>
							<Input
								type="text"
								placeholder="Prénom"
								value={prenom()}
								onChange={(prenom) => setPrenom(prenom)}
								required
							/>
						</Space>
					</Space>
					<Space vertical>
						<Text bold> Adresse mail </Text>
						<Input
							type="email"
							placeholder="nomprenom@gmail.com"
							value={userData().email}
							required
							disabled
						/>
					</Space>
					<Space vertical>
						<Text bold> Compétences </Text>
						<Input
							id="competences-input"
							class="input-competence"
							type="text"
							placeholder="Ex: Informatique"
							required
						/>
					</Space>
					<Space wrap>
						<Space vertical>
							<Text bold> Code Postal </Text>
							<Input
								type="number"
								placeholder="9999"
								value={codePostal()}
								onChange={(codePostal) => setCodePostal(codePostal)}
								required
							/>
						</Space>
						<Space vertical>
							<Text bold> Ville </Text>
							<Select
								placeholder={"Sélectionnez une ville"}
								options={["Lyon", "Bruxelles", "Leuven"]}
								value={ville()}
								onChange={(ville: string) => setVille(ville)}
								required
							/>
						</Space>
					</Space>
					<Space vertical>
						<Text bold> Adresse </Text>
						<Input
							type="text"
							placeholder="Rue de la place, 14"
							value={addresse()}
							onChange={(addresse) => setAddresse(addresse)}
							required
						/>
					</Space>
					<Space vertical>
						<Text bold> Documents </Text>
						<Input
							type="file"
							accept="image/png, image/jpeg"
							multiple
							required
						/>
					</Space>
					<Button type="primary" onClick={handleSubmit}>
						Enregistrer
					</Button>
				</Space>
			</Space>
		</Card>
	);
};

export default Profile;
