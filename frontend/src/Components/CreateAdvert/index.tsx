import { Button } from '@jundao/design';
import { createSignal, Show } from 'solid-js';
import { useGlobalContext } from '../../context.tsx';
import './index.css';

const CreateAdvert = ({ setPage }) => {
    const { user } = useGlobalContext();
    const enterpriseId = user?.enterprise_id;
    const role = user.role;

    const [formData, setFormData] = createSignal({
        title: '',
        description: '',
        location: '',
        start_date: '',
        end_date: '',
        salary: '',
    });

    const [isSubmitting, setIsSubmitting] = createSignal(false);
    const [error, setError] = createSignal(null);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        if (!user || !enterpriseId) {
            setError('User is not associated with an enterprise');
            setIsSubmitting(false);
            return;
        }

        const advertData = {
            ...formData(),
            enterprise_id: enterpriseId,
        };
        if (role !== 'enterprise') {
            setError('User does not have the required role');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/adverts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(advertData),
            });

            if (!response.ok) {
                throw new Error('Failed to create advert');
            }

            console.log('Advert created successfully');
            setPage('adverts');
        } catch (error) {
            setError('Error creating advert: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onReset = () => {
        setFormData({
            title: '',
            description: '',
            location: '',
            start_date: '',
            end_date: '',
            salary: '',
        });
    };

    return (
        <div id="divCreationAdvert">
            <h1 id="titlePage">Create Advert</h1>
            <br />
            <Show when={error()} fallback={null}>
                <div class="error">{error()}</div>
            </Show>
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
                        onInput={(e) => setFormData({ ...formData(), title: e.currentTarget.value })}
                        required
                    />
                </div>
                <div class="infoField">
                    <label class="label" for="description">
                        * Description
                    </label>
                    <textarea
                        class="inputs"
                        name="description"
                        id="description"
                        placeholder="Enter a description"
                        value={formData().description}
                        onInput={(e) => setFormData({ ...formData(), description: e.target.value })}
                        required
                        ></textarea>
                </div>
                <div class="infoField">
                    <label class="label" for="location">
                        * Location
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
                            Starting date of service:{' '}
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
                            Ending date of service:{' '}
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
                    <label class="label" for="salary">
                        * Salary
                    </label>
                    <input
                        class="inputs"
                        name="salary"
                        id="salary"
                        type="number"
                        placeholder="Enter the salary"
                        value={formData().salary}
                        onInput={(e) => setFormData({ ...formData(), salary: e.target.value })}
                        required
                    />
                </div>
            <br />
            <div class="buttons">
                <Button id="submit" onClick={handleSubmit} disabled={isSubmitting()}>
                    {isSubmitting() ? 'Submitting...' : 'Submit'}
                </Button>
                <Button id="reset" type="reset" onClick={onReset}>
                    Reset form
                </Button>
                <Button id="backButton" onClick={() => setPage('page1')}>
                    Back to Menu
                </Button>
            </div>
        </div>
    );
};

export default CreateAdvert;