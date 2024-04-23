import { createSignal, createEffect } from "solid-js";
import CreateAdvert from "../../Components/CreateAdvert";
import EnterpriseAdverts from "../../Components/EnterpriseAdverts";
import './index.css'

const TestPage = () => {
	const [page, setPage] = createSignal("list");
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
			{page() !== "create" && (
                <button id="buttonAdverts" onClick={() => setPage("create")}>+ Post new Advert</button>
            )}

			{page() === "list" ? (
					<>
					<div>
						<h2>Enterprise Adverts</h2>
						<ul class="advertsContainer">
							{adverts().map((ad) => (
								<EnterpriseAdverts
									id={ad.id}
									title={ad.title}
									description={ad.description}
									location={ad.location}
									start_date={ad.start_date}
									end_date={ad.end_date}
									salary={ad.salary}
									setPage={setPage()}
								/>
							))}
						</ul>
					</div>
					</>
			) : (
				<CreateAdvert setPage={setPage} />
			)}
		</div>
	);
};

export default TestPage;
