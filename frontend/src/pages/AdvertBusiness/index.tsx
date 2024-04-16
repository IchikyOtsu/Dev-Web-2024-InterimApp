import { createSignal, createEffect } from "solid-js";
import CreateAdvert from "../../Components/CreateAdvert";
import EnterpriseAdverts from "../../Components/EnterpriseAdverts";
import './index.css'

const TestPage = () => {
	const [page, setPage] = createSignal("create");
	const [adverts, setAdverts] = createSignal([]);

	createEffect(() => {
		fetch("/api/adverts")
			.then((res) => res.json())
			.then((data) => setAdverts(data))
			.catch((err) => console.error("API call failed:", err));
	});

	return (
		<div>
			<h1>Test Page</h1>
			<button id="buttonCreatePage" onClick={() => setPage("create")}>Create Advert</button>
			<button id="buttonAdverts" onClick={() => setPage("list")}>Enterprise Adverts</button>

			{page() === "create" ? (
				<CreateAdvert setPage={setPage} />
			) : (<>
				<div>
					<h2>Enterprise Adverts</h2>
					<ul class="advertsContainer">
						{adverts().map((ad) => (
							<EnterpriseAdverts
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
				</>
			)}
		</div>
	);
};

export default TestPage;
