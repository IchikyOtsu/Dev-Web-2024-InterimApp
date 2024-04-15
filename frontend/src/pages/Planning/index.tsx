// PlanningPage.tsx
import { createEffect, createSignal } from "solid-js";
import Calendar from "../../Components/Calendar";

const PlanningPage = () => {
    const [events, setEvents] = createSignal([]);

    const fetchAcceptedAdverts = async () => {
        try {
            const response = await fetch("/api/accepted");
            const data = await response.json();
            setEvents(data.map(advert => ({
                id: advert.id,
                title: advert.title,
                start: new Date(advert.start_date),
                end: new Date(advert.end_date),
            })));
        } catch (error) {
            console.error("Error fetching accepted adverts:", error);
        }
    };

    createEffect(() => {
        fetchAcceptedAdverts();
    });

    return (
        <div>
            <h1>Planning</h1>
            <Calendar events={events()} />
        </div>
        );
};

export default PlanningPage;