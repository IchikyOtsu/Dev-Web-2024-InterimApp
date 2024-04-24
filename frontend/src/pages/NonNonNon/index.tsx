import { Card, Image, Link, Space, Text, Title } from "@jundao/design";
// NonNonNon.tsx
import "./index.css";

const NonNonNon = () => {
	return (
		<div class="pageContainer">
			<Card>
				<Space vertical align="center" size="medium">
					<Image
						src="https://i.imgflip.com/4/4t0m5.jpg"
						alt="Nope meme"
						shape="rounded"
						style="margin: 2rem"
					/>
					<Title>Non, non, non !</Title>
					<Text>Vous n'êtes pas autorisé à accéder à cette page.</Text>
					<Link href="/" class="nonNonNonButton">
						Retourner à l'accueil
					</Link>
				</Space>
			</Card>
		</div>
	);
};

export default NonNonNon;
