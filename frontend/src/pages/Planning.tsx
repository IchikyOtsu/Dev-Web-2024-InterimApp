
import { createSignal } from 'solid-js';
import {Button, Modal, Input} from "@jundao/design";

const PlanningPage = () => {
    const [isPopupOpen, setIsPopupOpen] = createSignal(false);

    return (
      <div>
        <h1>Page planning</h1>
        <Button onClick={() => setIsPopupOpen(true)}>Publier une annonce</Button>
        {/* Le reste de votre page */}
        <Modal open={isPopupOpen()} onOpenChange={setIsPopupOpen} title={"Publier annonce"}>
          <Input type="text"/>
        </Modal>
      </div>
    );
};
  
export default PlanningPage;
