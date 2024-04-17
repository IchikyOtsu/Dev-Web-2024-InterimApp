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
        title: title || "",
        description: description || "",
        location: location || "",
        start_date: start_date || "",
        end_date: end_date || "",
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

    const isSubmit = async () => {
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
                </div>
                <div class="form-group">
                    <label class="label" for="start_date">Start Date:</label>
                    <input
                        class="input"
                        type="date"
                        id="start_date"
                        value={formData().start_date}
                        onInput={(e) => setFormData({ ...formData(), start_date: e.currentTarget.value })}
                    />
                </div>
                <div class="form-group">
                    <label class="label" for="end_date">End Date:</label>
                    <input
                        class="input"
                        type="date"
                        id="end_date"
                        value={formData().end_date}
                        onInput={(e) => setFormData({ ...formData(), end_date: e.currentTarget.value })}
                    />
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
                </div>

                <Button id="submitButton" onClick={isSubmit}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default ModifyAdvert;