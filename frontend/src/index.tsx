// index.tsx
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

// Importez App comme un composant de layout racine
import App from "./App";

// Lazy-loading des composants de page
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// Récupérez l'élément racine de manière sûre
const root = document.getElementById("root");

// Assurez-vous que `root` existe avant de rendre l'application
if (root) {
  render(
    () => (
      <Router root={App}>
          <Route path="/" component={HomePage} />
          <Route path="/adverts" component={AboutPage} />
          {/* Ajoutez plus de routes selon le besoin */}
      </Router>
    ),
    root
  );
}
