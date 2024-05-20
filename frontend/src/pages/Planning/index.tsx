import { Text } from "@jundao/design";
import { createEffect, createSignal } from "solid-js";
import Calendar from "../../Components/Calendar";
import { useGlobalContext } from "../../context";

const PlanningPage = () => {
	const [events, setEvents] = createSignal([]);
	const { user } = useGlobalContext();

	const fetchAcceptedAdverts = async () => {
		try {
			if (user.latest) {
				const response = await fetch(`/api/adverts/accepted-adverts/${user.latest.id}`);
				const data = await response.json();
				setEvents(
					data.map((advert) => ({
						id: advert.id,
						title: advert.title,
						start: new Date(advert.start_date),
						end: new Date(advert.end_date),
					}))
				);
			}
		} catch (error) {
			console.error("Error fetching accepted adverts:", error);
		}
	};

	createEffect(() => {
		if (user.state === "ready") {
			fetchAcceptedAdverts();
		}
	});

	return (
		<>
			<Text>Planning</Text>
			{user.loading ? (
				<Text>Loading...</Text>
			) : user.error ? (
				<Text>Error: {user.error.message}</Text>
			) : user.latest ? (
				<Calendar events={events()} />
			) : (
				<Text>No user data available</Text>
			)}
		</>
	);
};

export default PlanningPage;