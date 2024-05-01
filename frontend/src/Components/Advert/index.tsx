import { Alert, Button, Card, Image, Modal, Space, Text } from "@jundao/design";
import { IoReaderOutline } from "solid-icons/io";
import { Show, createSignal } from "solid-js";
import { useGlobalContext } from "../../context.tsx";
import "./index.css";

export interface Advert {
	id: number;
	company: string;
	image_link: string;
	title: string;
	description: string;
	location: string;
	salary: string;
	start_date: string;
	end_date: string;
}

export const AdvertCard = (props: Advert) => {
	const {
		id,
		company,
		image_link,
		title,
		description,
		location,
		salary,
		start_date,
		end_date,
	} = props;
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
		const date = new Date(stringDate);
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
		return hours > 0
			? hours > 24
				? `${Math.floor(hours / 24)} days`
				: `${Math.floor(hours)} hours`
			: "?";
	}

	return (
		<>
			<Card role="button" class="adv-card" onClick={() => setIsPopupOpen(true)}>
				<Space style="gap: 0;">
					<Image
						src={image_link}
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
				<Space vertical>
					<Text>{title}</Text>
					<Text>{description}</Text>
					<Text>
						{getFormattedDate(start_date) === getFormattedDate(end_date)
							? getFormattedDate(start_date)
							: `${getFormattedDate(start_date)} - ${getFormattedDate(
									end_date,
								)}`}
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
				</Space>
			</Modal>
		</>
	);
};
