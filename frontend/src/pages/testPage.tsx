import { createSignal } from 'solid-js';
import CreateAdvert from '../Components/CreateAdvert';
import EnterpriseAdverts from '../Components/EnterpriseAdverts';

const TestPage = () => {
    const [page, setPage] = createSignal('create');

    return (
        <div>
            <h1>Test Page</h1>
            <button onClick={() => setPage('create')}>Create Advert</button>
            <button onClick={() => setPage('list')}>Enterprise Adverts</button>

            {page() === 'create' ? (
                <CreateAdvert setPage={setPage} />
                ) : (
                    <EnterpriseAdverts />
                    )}
        </div>
        );
};

export default TestPage;