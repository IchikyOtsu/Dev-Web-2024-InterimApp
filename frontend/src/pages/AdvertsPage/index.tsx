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
					{(ad) => <AdvertCard advertData={ad} edit={false} />}
				</For>
			</Space>
		</Space>
	);
};

export default AdvertsPage;
