import { Button } from '@jundao/design';
import { createEffect, createSignal } from 'solid-js';
import { useGlobalContext } from "../../context.tsx";
// import 'index.css';


const DeleteAdvert = (props) => {
    const [error, setError] = createSignal(null);
    const { user } = useGlobalContext();
	const enterpriseId = user?.enterprise_id;
	const role = user.role;

    const { key } = props;

    const handleDelete = async () => {
		setError(null);

		if (!user || !enterpriseId) {
			setError("User is not associated with an enterprise");
			return;
		}

		if (role !== "enterprise") {
			setError("User does not have the required role");
			return;
		}

		try {
			const response = await fetch(`/api/adverts/${key}`, {
				method: "DELETE"
			});

			if (!response.ok) {
				throw new Error("Failed to delete advert");
			}

            // const data = await response.json();
			console.log("Advert DELETED successfully : ", data.message);
		} catch (error) {
			setError("Error creating advert: " + error.message);
		}
    };

    const isYesClicked = () => {
        handleDelete();
        
        return (
            <>
                <div>
                    <p>
                        Annonce supprimée
                    </p>
                </div>
            </>
        );
    };

    const isNoClicked = () => {
        return (
            <>
                <div>
                    <p>
                        Annonce NON supprimée
                    </p>
                </div>
            </>
        );
    };

    return (
        <>
            <div>
                <h4>
                    Êtes-vous sûr et certain de vouloir supprimer cette annonce ?
                </h4>
                <Button onClick={isYesClicked}>
                    Oui
                </Button>
                <Button onClick={isNoClicked}>
                    No !
                </Button>
            </div>
        </>
    );
};

export default DeleteAdvert;