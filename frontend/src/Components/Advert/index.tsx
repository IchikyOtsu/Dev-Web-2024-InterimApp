
import './index.css';
import { createSignal } from 'solid-js';
import { Modal, Input } from "@jundao/design";
const CardAdvert = (props) => {
  const { title, message, location, time, duration, date } = props;
  const [isPopupOpen, setIsPopupOpen] = createSignal(false);

  return (
    <div class='card1' onClick={() => setIsPopupOpen(true)}>
      <img src="./public/vite.svg" alt="Avatar" class="avatar" />
      <div id='des'>
        <div id='doc'>
          <h2>{title}</h2>
          <p>{message}</p>
          <div class="details">
            <h4>{location}</h4>
            <span>{time}</span>
            <span>{duration}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      {/* Popup pour afficher les détails de l'annonce */}
      <Modal open={isPopupOpen()} onOpenChange={setIsPopupOpen} title={"Détails de l'annonce"}>
        <div>
          <h2>{title}</h2>
          <p>{message}</p>
          <p>{location} - {date}</p>
          {/* Ajoutez plus de détails si nécessaire */}
        </div>
      </Modal>
    </div>
    );
};

export default CardAdvert;