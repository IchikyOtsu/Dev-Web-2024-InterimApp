// index.tsx
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

// Importez App comme un composant de layout racine
import App from "./App";
import { GlobalContext, globalContextData } from "./context";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute.tsx";

// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Login = lazy(() => import("./pages/Login"))
const Adverts = lazy(() => import("./pages/Adverts"));
const ProfilePage = lazy(() => import("./pages/Profile"));

// Récupérez l'élément racine de manière sûre
const root = document.getElementById("root");

// Assurez-vous que `root` existe avant de rendre l'application
if (root) {
    render(
        () => (
            <GlobalContext.Provider value={globalContextData}>
                <Router root={App}>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={() => <ProtectedRoute component={Adverts} allowedRoles={["user", "enterprise"]} />} />
                    <Route path="/adverts" component={() => <ProtectedRoute component={Adverts} allowedRoles={["user", "enterprise"]} />} />
                    <Route path="/planning" component={() => <ProtectedRoute component={Planning} allowedRoles={["user"]} />} />
                    <Route path="/profile" component={() => <ProtectedRoute component={ProfilePage} allowedRoles={["enterprise"]} />} />
                </Router>
            </GlobalContext.Provider>
            ),
        root
        );
}