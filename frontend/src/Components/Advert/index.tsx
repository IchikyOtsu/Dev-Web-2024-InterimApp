import {
	Alert,
	Button,
	Card,
	Image,
	Input,
	Modal,
	Select,
	Space,
	Text,
} from "@jundao/design";
import { IoReaderOutline } from "solid-icons/io";
import { Show, createSignal, onMount } from "solid-js";
import { useGlobalContext } from "../../context.tsx";
import "./index.css";

export interface Advert {
	id: number;
	enterprise_id: number;
	company: string;
	image_url: string;
	title: string;
	description: string;
	location: string;
	salary: string;
	start_date: string;
	end_date: string;
	status: string;
}

export const AdvertCard = (props: { advertData: Advert; edit: boolean }) => {
	const {
		id,
		company,
		image_url,
		title,
		description,
		location,
		salary,
		start_date,
		end_date,
	} = props.advertData;
	const { user } = useGlobalContext();
	const [isModalOpen, setIsModalOpen] = createSignal(false);
	const [error, setError] = createSignal<string>();
	const [success, setSuccess] = createSignal<string>();

	const [isApplying, setIsApplying] = createSignal(false);
	const [alreadyApplied, setAlreadyApplied] = createSignal(false);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);
	const [isEditing, setIsEditing] = createSignal(false);
	const [modifiedAdvertData, setModifiedAdvertData] = createSignal<Advert>(
		props.advertData,
	);

	const checkIfAlreadyApplied = async () => {
		try {
			const response = await fetch(
				`/api/applications?user_id=${user?.id}&advert_id=${id}`,
			);
			const data = await response.json();
			setAlreadyApplied(data.length > 0);
		} catch (error) {
			console.error("Error checking application status:", error);
		}
	};

	onMount(() => checkIfAlreadyApplied());

	const applyForAdvert = async () => {
		setIsApplying(true);
		!setError();
		!setSuccess();

		if (!user || user.role !== "user") {
			setError("You are not allowed to apply for this advert");
			!setIsApplying();
			return;
		}

		if (alreadyApplied()) {
			setError("You have already applied for this advert");
			!setIsApplying();
			return;
		}

		try {
			const response = await fetch("/api/applications", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: user.id,
					advert_id: id,
					status: "pending",
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to apply for advert");
			}

			setSuccess("Application submitted successfully");
			setAlreadyApplied(true);
			!setIsApplying();
		} catch (error) {
			setError(`Failed to apply for advert: ${error.message}`);
			!setIsApplying();
		}
	};

	const modifyAdvert = async () => {
		setIsEditing(true);
		!setError();
		!setSuccess();

		if (!user || !user.enterprise_id) {
			setError("User is not associated with an enterprise");
			!setIsEditing();
			return;
		}

		if (user.role !== "enterprise") {
			setError("User does not have the required role");
			!setIsEditing();
			return;
		}

		if (modifiedAdvertData() === props.advertData) {
			setSuccess("Nothing changed");
			!setIsEditing();
			return;
		}

		try {
			const response = await fetch(`/api/adverts/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(modifiedAdvertData()),
			});

			if (!response.ok) {
				throw new Error("Failed to update advert");
			}

			setSuccess("Advert updated successfully");
			!setIsEditing();
		} catch (error) {
			setError(`Error updating advert: ${error.message}`);
			!setIsEditing();
		}
	};

	const deleteAdvert = async () => {
		setModifiedAdvertData((prev) => ({ ...prev, status: "expired" }));
		await modifyAdvert().then(() => !setIsDeleteModalOpen());
	};

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			weekday: "long",
			day: "2-digit",
			month: "2-digit",
		}).format(date);
	}

	function calculateTime(start_date: string, end_date: string) {
		const startDate = new Date(start_date);
		const endDate = new Date(end_date);
		const diffInMilliSeconds = Math.abs(
			endDate.getTime() - startDate.getTime(),
		);
		const hours = diffInMilliSeconds / (1000 * 60 * 60);
		return hours > 0 && !Number.isNaN(hours)
			? hours > 24
				? `${Math.floor(hours / 24)} days`
				: `${Math.round(hours)} hours`
			: "- hours";
	}

	return (
		<>
			<Card role="button" class="adv-card" onClick={() => setIsModalOpen(true)}>
				<Space style="gap: 0;">
					<Image
						src={image_url}
						shape="square"
						class="adv-picture"
						fallback={<IoReaderOutline class="adv-icon" />}
					/>
					<Space class="info">
						<Space vertical size="medium">
							<Space vertical>
								<span>{title}</span>
								<span style="font-size: 0.8rem;">
									{company ? company : "Unknown"}
								</span>
							</Space>
							<span style="font-size: 0.8rem;">{location}</span>
						</Space>
						<Space vertical size="medium" style={"align-items: flex-end;"}>
							<span>{salary}€/h</span>
							<Space vertical style="align-items: flex-end; font-size: 0.8rem;">
								<span>{calculateTime(start_date, end_date)}</span>
								<span>{formatDate(start_date)}</span>
							</Space>
						</Space>
					</Space>
				</Space>
			</Card>
			<Modal
				open={isModalOpen()}
				onOpenChange={setIsModalOpen}
				title={"Détails de l'annonce"}
			>
				<Show
					when={props.edit}
					fallback={
						<Space vertical>
							<Text>{title}</Text>
							<Text>{description}</Text>
							<Text>
								{formatDate(start_date) === formatDate(end_date)
									? formatDate(start_date)
									: `${formatDate(start_date)} - ${formatDate(end_date)}`}
							</Text>
							<Text>{location}</Text>
							<Button
								type="primary"
								onClick={applyForAdvert}
								disabled={isApplying()}
							>
								{isApplying() ? "Applying..." : "Apply for this advert"}
							</Button>
							<Show when={error()}>
								<Alert type="error" message={error()} />
							</Show>
							<Show when={success()}>
								<Alert type="success" message={success()} />
							</Show>
						</Space>
					}
				>
					<Space vertical>
						<Space align="center" wrap>
							<Input
								label="Poste"
								value={modifiedAdvertData().title}
								onChange={(newTitle) =>
									setModifiedAdvertData((prev) => ({
										...prev,
										title: newTitle,
									}))
								}
							/>
							<Input
								type="number"
								label="Salaire(€/h)"
								value={modifiedAdvertData().salary}
								onChange={(newSalary) =>
									setModifiedAdvertData((prev) => ({
										...prev,
										salary: newSalary,
									}))
								}
							/>
						</Space>
						<Input
							label="Description"
							type="textarea"
							value={modifiedAdvertData().description}
							onChange={(newDesc) =>
								setModifiedAdvertData((prev) => ({
									...prev,
									description: newDesc,
								}))
							}
						/>
						<Select
							label="Localisation"
							placeholder="Sélectionner"
							options={["Lyon", "Bruxelles", "Paris"]}
							value={modifiedAdvertData().location}
							onChange={(newLocation: string) =>
								setModifiedAdvertData((prev) => ({
									...prev,
									location: newLocation,
								}))
							}
						/>
						<Space align="center" wrap>
							<Input
								disabled
								label="Date début"
								placeholder="Sélectionner"
								value={modifiedAdvertData().start_date}
								onChange={(newStartDate: string) =>
									setModifiedAdvertData((prev) => ({
										...prev,
										start_date: newStartDate,
									}))
								}
							/>
							<Input
								disabled
								label="Date fin"
								placeholder="Sélectionner"
								value={modifiedAdvertData().end_date}
								onChange={(newEndDate: string) =>
									setModifiedAdvertData((prev) => ({
										...prev,
										end_date: newEndDate,
									}))
								}
							/>
						</Space>
						<Space align="center" wrap>
							<Button
								type="primary"
								onClick={modifyAdvert}
								disabled={isEditing()}
							>
								Modifier
							</Button>
							<Button
								type="primary"
								danger
								onClick={() => setIsDeleteModalOpen(true)}
							>
								Supprimer
							</Button>
						</Space>
						<Show when={error()}>
							<Alert type="error" message={error()} />
						</Show>
						<Show when={success()}>
							<Alert type="success" message={success()} />
						</Show>
					</Space>
					<Modal
						open={isDeleteModalOpen()}
						onOpenChange={setIsDeleteModalOpen}
						title="Supprimer Annonce"
						footer={
							<Space align="center" wrap style="align-items: flex-end;">
								<Button onClick={() => !setIsDeleteModalOpen()}>Non</Button>
								<Button
									type="primary"
									danger
									onClick={deleteAdvert}
									disabled={isEditing()}
								>
									Oui
								</Button>
							</Space>
						}
					>
						<Text>Êtes-vous sûr de vouloir supprimer cette annonce ?</Text>
					</Modal>
				</Show>
			</Modal>
		</>
	);
};
