import './index.css';
import { createSignal } from 'solid-js';
import { Modal, Input, Button } from "@jundao/design";
import ModifyAdvert from '../ModifyAdvert';

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
      <Modal open={isPopupOpen()} onOpenChange={setIsPopupOpen} title={"More details"}>
        <div>
          <h2>{title}</h2>
          <p>{message}</p>
          <p>{location} - {date}</p>
          {/* Ajoutez plus de détails si nécessaire */}
          <Button id="modificationButton" onClick={() => {ModifyAdvert}}>Modify advert</Button>
        </div>
      </Modal>
    </div>
    );
};

export default CardAdvert;