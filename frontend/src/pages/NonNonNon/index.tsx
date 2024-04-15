import { A } from "@solidjs/router";
// NonNonNon.tsx
import "./NonNonNon.css";

const NonNonNon = () => {
	return (
		<div class="nonNonNonContainer">
			<div class="nonNonNonMeme">
				<img src="https://i.imgflip.com/4/4t0m5.jpg" alt="Nope meme" />
				<h1>Non, non, non !</h1>
				<p>Vous n'êtes pas autorisé à accéder à cette page.</p>
				<A href="/" class="nonNonNonButton">
					Retourner à l'accueil
				</A>
			</div>
		</div>
	);
};

export default NonNonNon;
