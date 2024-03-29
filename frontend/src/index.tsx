// index.tsx
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

// Importez App comme un composant de layout racine
import App from "./App";

// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Adverts = lazy(() => import("./pages/Adverts"));

// Récupérez l'élément racine de manière sûre
const root = document.getElementById("root");

// Assurez-vous que `root` existe avant de rendre l'application
if (root) {
  render(
    () => (
      <Router root={App}>
          <Route path="/" component={Adverts} />
          <Route path="/adverts" component={Adverts} />
          <Route path="/planning" component={Planning}/>
          {/* Ajoutez plus de routes selon le besoin */}
      </Router>
    ),
    root
  );
}
