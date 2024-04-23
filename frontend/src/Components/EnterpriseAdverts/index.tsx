import './index.css';
import { createEffect, createSignal, Show } from "solid-js";
import { useGlobalContext } from "../../context";
import { Button, Modal } from "@jundao/design";
import ModifyAdvert from "../ModifyAdvert";
import DeleteAdvert from "../DeleteAdvert";

const EnterpriseAdverts = (props) => {
	const { user } = useGlobalContext();
	const enterpriseId = user?.enterprise_id;
	const [adverts, setAdverts] = createSignal([]);
	const [isPopupOpen, setIsPopupOpen] = createSignal(false);
	const { id, title, description, location, start_date, end_date, salary } = props;
	const [showModifyMenu, setShowModifyMenu] = createSignal(false);
	const [showDeleteMenu, setShowDeleteMenu] = createSignal(false);

	// Signal pour stocker les données de l'annonce à modifier
    const [advertToModify, setAdvertToModify] = createSignal(null);

	const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`; // Ajoute un zéro devant si le mois est inférieur à 10
        }
        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`; // Ajoute un zéro devant si le jour est inférieur à 10
        }
        return `${day}-${month}-${year}`;
    };

    // Formater les dates reçues
    const formattedStartDate = formatDate(start_date);
    const formattedEndDate = formatDate(end_date);

	createEffect(() => {
		if (!enterpriseId) {
			console.error("User is not associated with an enterprise");
			return;
		}

		fetch(`/api/adverts/enterprises/${enterpriseId}`)
			.then((res) => res.json())
			.then((data) => setAdverts(data))
			.catch((err) => console.error("API call failed:", err));
	});

	// Fonction appelée lors du clic sur le bouton "Modify"
    const handleModifyClick = () => {
        const advertData = { // Création d'un objet contenant les données de l'annonce à modifier
            id,
            title,
            description,
            location,
            start_date,
            end_date,
            salary
        };
        setAdvertToModify(advertData); // Stockage des données de l'annonce à modifier
    };

	const isModifyClicked = () => {
		setShowDeleteMenu(false);
		setShowModifyMenu(true);
	};

	const isDeleteClicked = () => {
		setShowModifyMenu(false);
		setShowDeleteMenu(true);
	};

	return (
		<>
			<div 
				role="button"
				tabIndex="0"
				class="card1"
				onClick={() => setIsPopupOpen(true)}
			>
				<img src="./public/vite.svg" alt="Avatar" class="avatar" />
				<div id="des">
					<div id={id}>
						<h3>{title}</h3>
						<p>{description}</p>
						<h4>Location: {location}</h4>
						<span>Start Date: {formattedStartDate}</span>
						<span>End Date: {formattedEndDate}</span>
						<span>Salary: {salary}</span>
					</div>
				</div>
			</div>
			<Modal
				open={isPopupOpen()}
				onOpenChange={setIsPopupOpen}
				title={"Advert details"}
			>
					<div>
						<h2>{title || "Nope"}</h2>
						<p>{description || "Bah non"}</p>
						<p>
							{location || "ou pas"} - {salary || "Pas de données"}
						</p>
						<Button id="modifyButton" onClick={handleModifyClick}>
							Modify
						</Button>
						<Modal
							open={advertToModify() !== null}
							onOpenChange={() => setAdvertToModify(null)}
							title={"Modification of the advert"}
						>

							{/* Transmettre les données de l'annonce à ModifyAdvert */}
							{advertToModify() !== null && (
								<ModifyAdvert
									id={advertToModify().id}
									title={advertToModify().title}
									description={advertToModify().description}
									location={advertToModify().location}
									start_date={advertToModify().start_date}
									end_date={advertToModify().end_date}
									salary={advertToModify().salary}
								/>
							)}
						</Modal>

						<Button id="deleteButton" onClick={isDeleteClicked}>
							Delete
						</Button>
						<Modal 
							open={showDeleteMenu()}
							onOpenChange={setShowDeleteMenu}
							title={"Suppression de l'annonce"}
						>
							<DeleteAdvert id={id} />
						</Modal>
					</div>
			</Modal>
		</>
	);
};

export default EnterpriseAdverts;
