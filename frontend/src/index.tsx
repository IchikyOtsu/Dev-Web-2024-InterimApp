// index.tsx
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

// Importez App comme un composant de layout racine
import App from "./App";
import { GlobalContext, GlobalContextData } from "./context";

// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Login = lazy(() => import("./pages/Login"))
const Adverts = lazy(() => import("./pages/Adverts"));
const ProfilePage = lazy(() => import("./pages/Profile"));

// Récupérez l'élément racine de manière sûre
const root = document.getElementById("root");

const globalContextValue: GlobalContextData = {
    session: "loading",
    edit: false,
    role: "user" // Hardcodez le rôle ici
};

// Assurez-vous que `root` existe avant de rendre l'application
if (root) {
    render(
        () => (
            <GlobalContext.Provider value={globalContextValue}>

                    <Router root={App}>
                        <Route path="/" component={Adverts}/>
                        <Route path="/login" component={Login} />
                        <Route path="/adverts" component={Adverts} />
                        <Route path="/planning" component={Planning} />
                        <Route path="/profile" component={ProfilePage} />

                </Router>
            </GlobalContext.Provider>
            ),
        root
        );
}