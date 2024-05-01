// AdvertsPage.tsx
import "./index.css";
import { Space } from "@jundao/design";
import { For, createSignal, onMount } from "solid-js";
import { type Advert, AdvertCard } from "../../Components/Advert";

const AdvertsPage = () => {
	const [adverts, setAdverts] = createSignal<Advert[]>([]);

	onMount(() => {
		fetch("/api/adverts")
			.then((res) => res.json())
			.then((data) => setAdverts(data))
			.catch((err) => console.error("API call failed:", err));
	});

	return (
		<Space vertical class="pageContainer">
			<Space size="medium" class="advContainer" wrap>
				<For each={adverts()}>
					{(ad) => (
						<AdvertCard
							id={ad.id}
							company={ad.company}
							image_link={ad.image_link}
							title={ad.title}
							description={ad.description}
							location={ad.location}
							salary={ad.salary}
							start_date={ad.start_date}
							end_date={ad.end_date}
						/>
					)}
				</For>
			</Space>
		</Space>
	);
};

export default AdvertsPage;
