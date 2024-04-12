import { A } from "@solidjs/router";
// NonNonNon.tsx
import styles from "./NonNonNon.module.css";

const NonNonNon = () => {
	return (
		<div class={styles.nonNonNonContainer}>
			<div class={styles.nonNonNonMeme}>
				<img src="https://i.imgflip.com/4/4t0m5.jpg" alt="Nope meme" />
				<h1>Non, non, non !</h1>
				<p>Vous n'êtes pas autorisé à accéder à cette page.</p>
				<A href="/" class={styles.nonNonNonButton}>
					Retourner à l'accueil
				</A>
			</div>
		</div>
	);
};

export default NonNonNon;
