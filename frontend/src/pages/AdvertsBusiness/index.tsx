// AdvertsPage.tsx
import "./index.css";
import {
	Alert,
	Button,
	Input,
	Modal,
	Select,
	Space,
	Text,
} from "@jundao/design";
import moment from "moment-timezone";
import { IoAdd } from "solid-icons/io";
import { For, Show, createSignal, onMount } from "solid-js";
import { type Advert, AdvertCard } from "../../Components/Advert";
import { useGlobalContext } from "../../context.tsx";

function getCurrentTime() {
	return moment().tz("Europe/Brussels").format("YYYY-MM-DDTHH:mm[Z]");
}

const AdvertsBusiness = () => {
	const { user } = useGlobalContext();
	const [adverts, setAdverts] = createSignal<Advert[]>([]);
	const [isModalOpen, setIsModalOpen] = createSignal(false);

	const [newAdvertData, setNewAdvertData] = createSignal<Advert>({
		enterprise_id: user?.enterprise_id,
		start_date: getCurrentTime(),
		end_date: getCurrentTime(),
	});
	const [isSubmitting, setIsSubmitting] = createSignal(false);
	const [error, setError] = createSignal<string>();
	const [success, setSuccess] = createSignal<string>();

	onMount(() => {
		fetch(`/api/adverts/enterprises/${user?.enterprise_id}`)
			.then((res) => res.json())
			.then((data) => setAdverts(data))
			.catch((err) => console.error("API call failed:", err));
	});

	const createAdvert = async () => {
		setIsSubmitting(true);
		!setError();
		!setSuccess();

		if (!user || !user.enterprise_id) {
			setError("User is not associated with an enterprise");
			setIsSubmitting(false);
			return;
		}

		if (user.role !== "enterprise") {
			setError("User does not have the required role");
			!setIsSubmitting();
			return;
		}

		try {
			const response = await fetch("/api/adverts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newAdvertData()),
			});

			if (!response.ok) {
				throw new Error("Failed to create advert");
			}

			setSuccess("Advert created successfully");
			!setIsSubmitting();
		} catch (error) {
			setError(`Error creating advert: ${error.message}`);
			!setIsSubmitting();
		}
	};

	return (
		<Space vertical class="pageContainer">
			<Space style="justify-content: center; width: 100%;">
				<Space vertical size="large" style="align-items: flex-end;">
					<Button class="add-button" onClick={() => setIsModalOpen(true)}>
						<Space align="center">
							<IoAdd class="add-icon" />
							<Text>Ajouter une annonce</Text>
						</Space>
					</Button>
					<Space size="medium" class="advContainer" wrap>
						<For each={adverts()}>
							{(ad) => <AdvertCard advertData={ad} edit={true} />}
						</For>
					</Space>
					<Modal
						open={isModalOpen()}
						onOpenChange={setIsModalOpen}
						title="Ajouter une annonce"
					>
						<Space vertical>
							<Space align="center" wrap>
								<Input
									label="Poste"
									value={newAdvertData().title}
									onChange={(newTitle) =>
										setNewAdvertData((prev) => ({ ...prev, title: newTitle }))
									}
								/>
								<Input
									type="number"
									label="Salaire(€/h)"
									value={newAdvertData().salary}
									onChange={(newSalary) =>
										setNewAdvertData((prev) => ({ ...prev, salary: newSalary }))
									}
								/>
							</Space>
							<Input
								label="Description"
								type="textarea"
								value={newAdvertData().description}
								onChange={(newDesc) =>
									setNewAdvertData((prev) => ({
										...prev,
										description: newDesc,
									}))
								}
							/>
							<Select
								label="Localisation"
								placeholder="Sélectionner"
								options={["Lyon", "Bruxelles", "Paris"]}
								value={newAdvertData().location}
								onChange={(newLocation: string) =>
									setNewAdvertData((prev) => ({
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
									value={newAdvertData().start_date}
									onChange={(newStartDate: string) =>
										setNewAdvertData((prev) => ({
											...prev,
											start_date: newStartDate,
										}))
									}
								/>
								<Input
									disabled
									label="Date fin"
									placeholder="Sélectionner"
									value={newAdvertData().end_date}
									onChange={(newEndDate: string) =>
										setNewAdvertData((prev) => ({
											...prev,
											end_date: newEndDate,
										}))
									}
								/>
							</Space>
							<Space align="center" wrap>
								<Button
									type="primary"
									onClick={createAdvert}
									disabled={isSubmitting()}
								>
									Ajouter
								</Button>
							</Space>
							<Show when={error()}>
								<Alert type="error" message={error()} />
							</Show>
							<Show when={success()}>
								<Alert type="success" message={success()} />
							</Show>
						</Space>
					</Modal>
				</Space>
			</Space>
		</Space>
	);
};

export default AdvertsBusiness;
