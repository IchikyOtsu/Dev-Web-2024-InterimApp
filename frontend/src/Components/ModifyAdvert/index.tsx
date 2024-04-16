import { Button } from "@jundao/design";
import { createEffect, createSignal } from "solid-js";
import { useGlobalContext } from "../../context.tsx";
import './index.css';

const ModifyAdvert = (props) => {
	const { title, description, location, id, start_date, end_date, salary } = props;
	const [error, setError] = createSignal(null);
	const { user } = useGlobalContext();
	const enterpriseId = user?.enterprise_id;
	const role = user.role;

	const [formData, setFormData] = createSignal({
		title: "",
		description: "",
		location: "",
		start_date: "",
		end_date: "",
		salary: "",
	});

	const handleSubmit = async () => {
		setError(null);

		if (!user || !enterpriseId) {
			setError("User is not associated with an enterprise");
			return;
		}

		const advertData = {
			...formData(),
			enterprise_id: enterpriseId,
		};
		if (role !== "enterprise") {
			setError("User does not have the required role");
			return;
		}

		try {
			const response = await fetch(`/api/adverts/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(advertData),
			});

			if (!response.ok) {
				throw new Error("Failed to delete advert");
			}

            // const data = await response.json();
			console.log("Advert MODIFIED successfully : ");
		} catch (error) {
			setError("Error creating advert: " + error.message);
		}
	};

	const isSubmit = async () => {
        await handleSubmit();
        
        return (
            <>
                <div>
                    <p>
                        Annonce mise à jour
                    </p>
                </div>
            </>
        );
    };

	return (
		<>
		<div class="advert-form">
			<h4>Here you can modify values of the advert</h4>
			<br></br>
			<div class="form-group">
				<label class="label" for="title">Title:</label>
				<input class="input" type="text" id="title" placeholder="Enter title" />
			</div>
			<div class="form-group">
				<label class="label" for="description">Description:</label>
				<textarea class="input" id="description" placeholder="Enter description"></textarea>
			</div>
			<div class="form-group">
				<label class="label" for="location">Location:</label>
				<input class="input" type="text" id="location" placeholder="Enter location" />
			</div>
			<div class="form-group">
				<label class="label" for="start_date">Start Date:</label>
				<input class="input" type="date" id="start_date" />
			</div>
			<div class="form-group">
				<label class="label" for="end_date">End Date:</label>
				<input class="input" type="date" id="end_date" />
			</div>
			<div class="form-group">
				<label class="label" for="salary">Salary:</label>
				<input class="input" type="number" id="salary" placeholder="Enter salary" />
			</div>

			<Button id="submitButton" onClick={isSubmit}>
				Submit
			</Button>
		</div>
		</>
	);
};

export default ModifyAdvert;
