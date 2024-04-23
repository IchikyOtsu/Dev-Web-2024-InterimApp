import { Button } from "@jundao/design";
import { createEffect, createSignal } from "solid-js";
import { useGlobalContext } from "../../context.tsx";
import './index.css';
import TestPage from "../../pages/testPage.tsx";

const ModifyAdvert = (props) => {
    const { id, title, description, location, start_date, end_date, salary } = props;
    const [error, setError] = createSignal(null);
    const { user } = useGlobalContext();
    const enterpriseId = user?.enterprise_id;
    const role = user.role;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`; // Ajoute un zéro devant si le mois est inférieur à 10
        }
        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`; // Ajoute un zéro devant si le jour est inférieur à 10
        }
        return `${year}-${month}-${day}`;
    };

    // Formater les dates reçues
    const formattedStartDate = formatDate(start_date);
    const formattedEndDate = formatDate(end_date);

    const [formData, setFormData] = createSignal({
        title: title || "",
        description: description || "",
        location: location || "",
        start_date: formattedStartDate || "",
        end_date: formattedEndDate || "",
        salary: salary || "",
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
                throw new Error("Failed to update advert");
            }

            console.log("Advert updated successfully");
        } catch (error) {
            setError("Error updating advert: " + error.message);
        }
    };

    const isSubmit = async (setPage) => {
        await handleSubmit();
        return (
            <>
                <div>
                    <p>Annonce mise à jour</p>
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
                    <input
                        class="input"
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        value={formData().title}
                        onInput={(e) => setFormData({ ...formData(), title: e.currentTarget.value })}
                    />
                    {console.log("Mon title contient ceci : ", title)}
                </div>
                <div class="form-group">
                    <label class="label" for="description">Description:</label>
                    <textarea
                        class="input"
                        id="description"
                        placeholder="Enter description"
                        value={formData().description}
                        onInput={(e) => setFormData({ ...formData(), description: e.currentTarget.value })}
                    ></textarea>
                    {console.log("Mon description contient ceci : ", description)}
                </div>
                <div class="form-group">
                    <label class="label" for="location">Location:</label>
                    <input
                        class="input"
                        type="text"
                        id="location"
                        placeholder="Enter location"
                        value={formData().location}
                        onInput={(e) => setFormData({ ...formData(), location: e.currentTarget.value })}
                    />
                    {console.log("Mon location contient ceci : ", location)}
                </div>
                <div class="form-group">
                    <label class="label" for="start_date">Start Date:</label>
                    <input
                        class="input"
                        type="date"
                        id="start_date"
                        value={formattedStartDate}
                        onInput={(e) => setFormData({ ...formData(), start_date: e.currentTarget.value })}
                    />
                    {console.log("Mon start_date contient ceci : ", start_date)}
                </div>
                <div class="form-group">
                    <label class="label" for="end_date">End Date:</label>
                    <input
                        class="input"
                        type="date"
                        id="end_date"
                        value={formattedEndDate}
                        onInput={(e) => setFormData({ ...formData(), end_date: e.currentTarget.value })}
                    />
                    {console.log("Mon end_date contient ceci : ", end_date)}
                </div>
                <div class="form-group">
                    <label class="label" for="salary">Salary:</label>
                    <input
                        class="input"
                        type="number"
                        id="salary"
                        placeholder="Enter salary"
                        value={formData().salary}
                        onInput={(e) => setFormData({ ...formData(), salary: e.currentTarget.value })}
                    />
                    {console.log("Mon salary contient ceci : ", salary)}
                </div>

                <Button id="submitButton" onClick={isSubmit}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default ModifyAdvert;