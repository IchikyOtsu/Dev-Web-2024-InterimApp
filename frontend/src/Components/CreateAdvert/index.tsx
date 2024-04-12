import { Button } from '@jundao/design';
import { createEffect, createSignal } from 'solid-js';
import './index.css';


const CreateAdvert = ({ setPage }) => {

    const [formData, setFormData] = createSignal({
        brand: "",
        title: "",
        description: "",
        location: "",
        start_date: "",
        end_date: "",
        times: "",
        gain: ""
      });

    // const onSubmit = () => {
    //     console.log(formData());
    // };

    const onSubmit = async (event: Event) => {
        console.log(formData());
        event.preventDefault();
        const jsonData = JSON.stringify(formData());

        try {
            const response = await fetch("URL_DU_BACKEND", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: jsonData
            });
      
            if (!response.ok) {
              throw new Error("Erreur lors de la soumission du formulaire");
            }
      
            // Traiter la réponse du backend si nécessaire
          } catch (error) {
            console.error("Erreur:", error);
            // Gérer l'erreur d'envoi
          }
    };

    const onReset = () => {
        setFormData({ 
            brand: "",
            title: "",
            description: "",
            location: "",
            start_date: "",
            end_date: "",
            times: "",
            gain: ""
        });

        // Réinitialiser les valeurs des champs input
        document.getElementById('brand').value = "";
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
        document.getElementById('location').value = "";
        document.getElementById('start_date').value = "";
        document.getElementById('end_date').value = "";
        document.getElementById('times').value = "";
        document.getElementById('gain').value = "";

        console.log(formData());
    };

    return (
        <div id="divCreationAdvert">
            <h1 id="titlePage">Create Advert</h1>
            <br/>
            <form id="formCreationAdvert">
            <br/>
            <div class="infoField">
                    <label class="label" for="brand">* The name of the enterprise</label>
                    <input class="inputs" name="brand" id="brand" type="text" placeholder="Set the name of the enterprise" onInput={(e) => setFormData({ ...formData(), brand: e.target.value })} required/>
                </div>
                <div class="infoField">
                    <label class="label" for="title">* Title of the advert</label>
                    <input class="inputs" name="title" id="title" type="text" placeholder="Enter a name for the advert" onInput={(e) => setFormData({ ...formData(), title: e.target.value })} required/>
                </div>
                <div class="infoField">
                    <label class="label" for="location">* The place</label>
                    <input class="inputs" name="location" id="location" type="text" placeholder="Choose a location" onInput={(e) => setFormData({ ...formData(), location: e.target.value })} required/>
                </div>
                <div class="infoField">
                    <label class="label">* Dates of service</label>
                    <div>
                        <label class="subLabel" for="start_date">Starting date of service : </label>
                        <input class="subInputs" name="start_date" id="start_date" type="date" placeholder="Choose a date" onInput={(e) => setFormData({ ...formData(), start_date: e.target.value })} required/>
                    </div>
                    <div class="infoField">
                        <label class="subLabel" for="end_date">Ending date of service : </label>
                        <input class="subInputs" name="end_date" id="end_date" type="date" placeholder="Choose a date" onInput={(e) => setFormData({ ...formData(), end_date: e.target.value })} required/>
                    </div>
                </div>
                <div class="infoField">
                    <label class="label" for="times">* Time of service</label>
                    <input class="inputs" name="times" id="times" type="time" placeholder="Enter the duration" onInput={(e) => setFormData({ ...formData(), times: e.target.value })} required/>
                </div>
                <div class="infoField">
                    <label class="label" for="gain">* Possible gain</label>
                    <input class="inputs" name="gain" id="gain" type="number" placeholder="Ex : 10 eur/h" onInput={(e) => setFormData({ ...formData(), gain: e.target.value })} required/>
                </div>
                <br/>
                <div class="buttons">
                    <Button id="submit" type="submit" onClick={onSubmit}>Submit</Button>
                    <Button id="reset" type="reset" value="Reset" onClick={onReset}>Reset form</Button>
                    <Button id="backButton" onClick={() => {setPage("page1")}}>Back to Menu</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateAdvert;