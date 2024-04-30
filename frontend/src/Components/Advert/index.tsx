import { Button, Card, Modal, Space } from "@jundao/design";
import { Show, createSignal } from "solid-js";
import { useGlobalContext } from "../../context.tsx";
import "./index.css";

export interface Advert {
	id: number;
	title: string;
	description: string;
	location: string;
	salary: string;
	start_date: string;
	end_date: string;
}

export const AdvertCard = (props: Advert) => {
	const { id, title, description, location, salary, start_date, end_date } =
		props;
	const [isPopupOpen, setIsPopupOpen] = createSignal(false);
	const [isApplying, setIsApplying] = createSignal(false);
	const [error, setError] = createSignal<string>();
	const [alreadyApplied, setAlreadyApplied] = createSignal(false);
	const { user } = useGlobalContext();

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

	const applyForAdvert = async () => {
		setIsApplying(true);
		setError(undefined);

		if (!user || user.role !== "user") {
			setError("You are not allowed to apply for this advert");
			setIsApplying(false);
			return;
		}

		if (alreadyApplied()) {
			setError("You have already applied for this advert");
			setIsApplying(false);
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

			console.log("Application submitted successfully");
			setAlreadyApplied(true);
		} catch (error) {
			setError(`Failed to apply for advert: ${error.message}`);
		} finally {
			setIsApplying(false);
			setIsPopupOpen(false);
		}
	};

	checkIfAlreadyApplied();

	function getFormattedDate(stringDate: string) {
		console.log(stringDate);
		const date = new Date(stringDate);
		return new Intl.DateTimeFormat("en-US", {
			weekday: "long",
			day: "2-digit",
			month: "2-digit",
		}).format(date);
	}

	return (
		<>
			<Card
				role="button"
				class="advert-card"
				onClick={() => setIsPopupOpen(true)}
			>
				<Space>
					<img src="/public/vite.svg" alt="Avatar" class="avatar" />
					<Space class="info">
						<Space vertical size="medium">
							<Space vertical>
								<span>{title}</span>
								<span style="font-size: 0.8rem;">Company Name</span>
							</Space>
							<span style="font-size: 0.8rem;">{location}</span>
						</Space>
						<Space vertical size="medium" style={"align-items: flex-end;"}>
							<span>{salary}€/h</span>
							<Space vertical style="align-items: flex-end; font-size: 0.8rem;">
								<span>{}hours</span>
								<span>{getFormattedDate(start_date)}</span>
							</Space>
						</Space>
					</Space>
				</Space>
			</Card>
			<Modal
				open={isPopupOpen()}
				onOpenChange={setIsPopupOpen}
				title={"Détails de l'annonce"}
			>
				<>
					<h2>{title}</h2>
					<p>{description}</p>
					<p>
						{location} - {start_date}
					</p>
					<Button onClick={applyForAdvert} disabled={isApplying()}>
						{isApplying() ? "Applying..." : "Apply for this advert"}
					</Button>
					<Show when={error()} fallback={null}>
						<div>{error()}</div>
					</Show>
				</>
			</Modal>
		</>
	);
};
