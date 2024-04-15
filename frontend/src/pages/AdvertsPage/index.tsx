// Adverts.tsx
import { createEffect, createSignal } from "solid-js";
import CardAdvert from "../../Components/Advert/index.tsx";
import "./Adverts.css";

const AdvertsPage = () => {
	const [adverts, setAdverts] = createSignal([]);

	createEffect(() => {
		fetch("/api/adverts")
			.then((res) => res.json())
			.then((data) => setAdverts(data))
			.catch((err) => console.error("API call failed:", err));
	});

	return (
		<div>
			<h1>Page Adverts</h1>
			<ul class="advertsContainer">
				{adverts().map((ad) => (
					<CardAdvert
						key={ad.id}
						id={ad.id}
						title={ad.title}
						message={ad.description}
						location={ad.location}
						time={ad.time}
						duration={ad.duration}
						date={ad.date}
					/>
				))}
			</ul>
		</div>
	);
};

export default AdvertsPage;
