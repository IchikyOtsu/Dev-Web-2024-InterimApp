import { Input } from "@jundao/design";
import { Select } from "@jundao/design";
import { Text } from "@jundao/design";
import "./index.css";
const Profile = ({ profilePicture }) => {
	return (
		<form>
			<div class="profile-card">
				<div class="left-section">
					<img src={profilePicture} alt="Profile" class="profile-picture" />
					<Text class="text" id="text-avatar">
						{" "}
						Nom Prénom{" "}
					</Text>
					<br />
					<Text class="text" id="text-avatar">
						{" "}
						nomprenom@email.com{" "}
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
							required
						/>
					</div>
					<div id="competences">
						<Text class="text"> Compétences </Text>
						<Input
							id="competences-input"
							class="input-competence"
							type="text"
							placeholder="Ex: Informatique"
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
								required
							/>
						</div>
						<div id="ville">
							<Text class="text"> Ville </Text>
							<Select
								id="ville-input"
								class="input-ville"
								placeholder={"Sélectionnez une ville"}
								options={["Item 1", "Item 2", "Item 3"]}
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
							multiple
							required
						/>
					</div>
					<Input type="submit" value="Envoyer" />
				</div>
			</div>
		</form>
	);
};

export default Profile;
