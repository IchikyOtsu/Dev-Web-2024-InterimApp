import { Button } from '@jundao/design';
import { createSignal } from 'solid-js';
import './index.css';

const CreateAdvert = ({ setPage }) => {
    const [formData, setFormData] = createSignal({
        brand: '',
        title: '',
        description: '',
        location: '',
        start_date: '',
        end_date: '',
        times: '',
        gain: '',
    });

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData());
    };

    const onReset = () => {
        setFormData({
            brand: '',
            title: '',
            description: '',
            location: '',
            start_date: '',
            end_date: '',
            times: '',
            gain: '',
        });
    };

    return (
        <div id="divCreationAdvert">
            <h1 id="titlePage">Create Advert</h1>
            <br />
            <form id="formCreationAdvert" onSubmit={onSubmit}>
                <br />
                <div class="infoField">
                    <label class="label" for="brand">
                        * The name of the enterprise
                    </label>
                    <input
                        class="inputs"
                        name="brand"
                        id="brand"
                        type="text"
                        placeholder="Set the name of the enterprise"
                        value={formData().brand}
                        onInput={(e) => setFormData({ ...formData(), brand: e.target.value })}
                        required
                    />
                </div>
                <div class="infoField">
                    <label class="label" for="title">
                        * Title of the advert
                    </label>
                    <input
                        class="inputs"
                        name="title"
                        id="title"
                        type="text"
                        placeholder="Enter a name for the advert"
                        value={formData().title}
                        onInput={(e) => setFormData({ ...formData(), title: e.target.value })}
                        required
                    />
                </div>
                <div class="infoField">
                    <label class="label" for="location">
                        * The place
                    </label>
                    <input
                        class="inputs"
                        name="location"
                        id="location"
                        type="text"
                        placeholder="Choose a location"
                        value={formData().location}
                        onInput={(e) => setFormData({ ...formData(), location: e.target.value })}
                        required
                    />
                </div>
                <div class="infoField">
                    <label class="label">* Dates of service</label>
                    <div>
                        <label class="subLabel" for="start_date">
                            Starting date of service :{' '}
                        </label>
                        <input
                            class="subInputs"
                            name="start_date"
                            id="start_date"
                            type="date"
                            placeholder="Choose a date"
                            value={formData().start_date}
                            onInput={(e) => setFormData({ ...formData(), start_date: e.target.value })}
                            required
                        />
                    </div>
                    <div class="infoField">
                        <label class="subLabel" for="end_date">
                            Ending date of service :{' '}
                        </label>
                        <input
                            class="subInputs"
                            name="end_date"
                            id="end_date"
                            type="date"
                            placeholder="Choose a date"
                            value={formData().end_date}
                            onInput={(e) => setFormData({ ...formData(), end_date: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div class="infoField">
                    <label class="label" for="times">
                        * Time of service
                    </label>
                    <input
                        class="inputs"
                        name="times"
                        id="times"
                        type="time"
                        placeholder="Enter the duration"
                        value={formData().times}
                        onInput={(e) => setFormData({ ...formData(), times: e.target.value })}
                        required
                    />
                </div>
                <div class="infoField">
                    <label class="label" for="gain">
                        * Possible gain
                    </label>
                    <input
                        class="inputs"
                        name="gain"
                        id="gain"
                        type="number"
                        placeholder="Ex : 10 eur/h"
                        value={formData().gain}
                        onInput={(e) => setFormData({ ...formData(), gain: e.target.value })}
                        required
                    />
                </div>
                <br />
                <div class="buttons">
                    <Button id="submit" type="submit">
                        Submit
                    </Button>
                    <Button id="reset" type="reset" onClick={onReset}>
                        Reset form
                    </Button>
                    <Button id="backButton" onClick={() => setPage('page1')}>
                        Back to Menu
                    </Button>
                </div>
            </form>
        </div>
        );
};

export default CreateAdvert;