import { createEffect, createSignal } from 'solid-js';

const AdvertsPage = () => {
    const [adverts, setAdverts] = createSignal([]); 

    createEffect(() => {
      fetch('/api/adverts')
        .then(res => res.json())
        .then(data => setAdverts(data)) 
        .catch(err => console.error("API call failed:", err));
    });

    return (
      <div>
        <h1>Page Adverts</h1>
        {/* Itère sur le tableau pour afficher chaque message */}
        <ul>
          {adverts().map(ad => (
            <li key={ad.id}>{ad.message}</li>
          ))}
        </ul>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti nihil, libero, aliquam voluptas enim, porro necessitatibus facilis dolores quod perferendis accusamus id corrupti! Sunt voluptates nihil explicabo. Consequatur, consequuntur ipsam.</p>
      </div>
    );
};

export default AdvertsPage;
