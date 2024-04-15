import { createEffect, createSignal } from "solid-js";
import { useGlobalContext } from "../../context";

const EnterpriseAdverts = () => {
	const { user } = useGlobalContext();
	const enterpriseId = user?.enterprise_id;
	const [adverts, setAdverts] = createSignal([]);

	createEffect(() => {
		if (!enterpriseId) {
			console.error("User is not associated with an enterprise");
			return;
		}

		fetch(`/api/adverts/enterprises/${enterpriseId}`)
			.then((res) => res.json())
			.then((data) => setAdverts(data))
			.catch((err) => console.error("API call failed:", err));
	});

	return (
		<div>
			<h2>Enterprise Adverts</h2>
			{adverts().map((advert) => (
				<div key={advert.id}>
					<h3>{advert.title}</h3>
					<p>{advert.description}</p>
					<p>Location: {advert.location}</p>
					<p>Start Date: {advert.start_date}</p>
					<p>End Date: {advert.end_date}</p>
					<p>Salary: {advert.salary}</p>
				</div>
			))}
		</div>
	);
};

export default EnterpriseAdverts;
