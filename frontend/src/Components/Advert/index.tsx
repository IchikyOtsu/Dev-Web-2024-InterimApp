import { Input, Modal, Button } from "@jundao/design";
import { createSignal } from "solid-js";
import "./index.css";
import { useGlobalContext } from "../../context.tsx";

const CardAdvert = (props) => {
    const { title, message, location, time, duration, date, id } = props;
    const [isPopupOpen, setIsPopupOpen] = createSignal(false);
    const [isApplying, setIsApplying] = createSignal(false);
    const [error, setError] = createSignal(null);
    const { user } = useGlobalContext();

    const applyForAdvert = async () => {
        setIsApplying(true);
        setError(null);

        if (!user || user.role !== "user") {
            setError("You are not allowed to apply for this advert");
            setIsApplying(false);
            return;
        }

        try {
            const response = await fetch(`/api/applications`, {
                method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user_id: user.id, advert_id: id, status: "pending" }),
			});

			if (!response.ok) {
				throw new Error("Failed to apply for advert");
			}

			console.log("Application submitted successfully");
		} catch (error) {
			setError("Failed to apply for advert: " + error.message);
		} finally {
			setIsApplying(false);
			setIsPopupOpen(false);
		}
	};

	return (
		<div class="card1" onClick={() => setIsPopupOpen(true)}>
			<img src="./public/vite.svg" alt="Avatar" class="avatar" />
			<div id="des">
				<div id="doc">
					<h2>{title}</h2>
					<p>{message}</p>
					<div class="details">
						<h4>{location}</h4>
						<span>{time}</span>
						<span>{duration}</span>
						<span>{date}</span>
					</div>
				</div>
			</div>
			<Modal open={isPopupOpen()} onOpenChange={setIsPopupOpen} title={"Détails de l'annonce"}>
				<div>
					<h2>{title}</h2>
					<p>{message}</p>
					<p>
						{location} - {date}
					</p>
					<Button onClick={applyForAdvert} disabled={isApplying()}>
						{isApplying() ? "Applying..." : "Apply for this advert"}
					</Button>
					<Show when={error()} fallback={null}>
						<div>{error()}</div>
					</Show>
				</div>
			</Modal>
		</div>
		);
};

export default CardAdvert;