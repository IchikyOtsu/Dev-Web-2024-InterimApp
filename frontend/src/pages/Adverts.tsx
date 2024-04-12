import { createEffect, createSignal } from 'solid-js';
import CardAdvert from '../Components/Advert/index.tsx'; // Vérifiez le chemin d'accès
import './Adverts.css';
import { Button } from '@jundao/design';
import CreateAdvert from '../Components/CreateAdvert/index.tsx';
import ModifyAdvert from '../Components/ModifyAdvert/index.tsx';
import DeleteAdvert from '../Components/DeleteAdvert/index.tsx';

const AdvertsPage = () => {
  const [adverts, setAdverts] = createSignal([]);
  const [currentPage, setCurrentPage] = createSignal("page1");

  createEffect(() => {
    fetch('/api/adverts')
      .then(res => res.json())
      .then(data => setAdverts(data)) 
      .catch(err => console.error("API call failed:", err));
  });

  const PageAdvert = () => {
    return (
      <div>
      <h1>Page Adverts</h1>
      <br/>
      <div>
        <button type="button" id="PostNewAdvertButton" onclick={() => setCurrentPage("page2")}>+ Post new advert</button>
      </div>
      <br/>
      <ul class="container">
        {adverts().map(ad => (
          // Assurez-vous que les champs passés correspondent aux données attendues par CardAdvert
          <CardAdvert key={ad.id} title={ad.title} message={ad.message} location={ad.location} time={ad.time} duration={ad.duration} date={ad.date} />
        ))}
      </ul>
    </div>
    );
  };

  return (
    <div>
      {currentPage() == "page1" ? <PageAdvert /> : 
      currentPage() == "page2" ? <CreateAdvert setPage={setCurrentPage} /> : <PageAdvert />}
    </div>
  );
};

export default AdvertsPage;