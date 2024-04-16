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
	const { title, description, location, id, start_date, end_date, salary } = props;
	const [showModifyMenu, setShowModifyMenu] = createSignal(false);
	const [showDeleteMenu, setShowDeleteMenu] = createSignal(false);

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
						<span>Start Date: {start_date}</span>
						<span>End Date: {end_date}</span>
						<span>Salary: {salary}</span>
					</div>
				</div>
			</div>
			<Modal
				open={isPopupOpen()}
				onOpenChange={setIsPopupOpen}
				title={"Détails de l'annonce"}
			>
					<div>
						<h2>{title}</h2>
						<p>{description}</p>
						<p>
							{location} - {salary}
						</p>
						<Button id="modifyButton" onClick={isModifyClicked}>
							Modify
						</Button>
						{/* {showModifyMenu() && <ModifyAdvert />} */}
						<Modal
							open={showModifyMenu()}
							onOpenChange={setShowModifyMenu}
							title={"Modification de l'annonce"}
						>
							<ModifyAdvert 
									id={id}
									title={title}
									description={description}
									location={location}
									start_date={start_date}
									end_date={end_date}
									salary={salary}
							/>
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
						{/* {showDeleteMenu() && <DeleteAdvert key={id} />} */}
					</div>
			</Modal>
		</>
	);
};

export default EnterpriseAdverts;
