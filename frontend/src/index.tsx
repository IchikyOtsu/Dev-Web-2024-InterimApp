// index.tsx
import {Signal, createSignal, lazy, useContext} from "solid-js";
import {render} from "solid-js/web";
import {Router, Route} from "@solidjs/router";

// Importez App comme un composant de layout racine
import App from "./App";
import {AuthSession} from "@supabase/supabase-js";
import {supabaseClient} from "./supabase";
import {GlobalContext} from "./context";

// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Login = lazy(() => import("./pages/Login"))
const Adverts = lazy(() => import("./pages/Adverts"));
const ProfilePage = lazy(() => import("./pages/Profile"));
// Récupérez l'élément racine de manière sûre
const root = document.getElementById("root");

const sessionSignal = createSignal<AuthSession | "loading">("loading");
const editSignal = createSignal(false);
const roleSignal = createSignal<GlobalContextData['role']['value']>(GlobalContext.role());
supabaseClient.auth
   .getSession()
   .then(({data}) => {
       sessionSignal[1](data.session);
       roleSignal[1](data.session?.user?.role || GlobalContext.role());
   });

// Assurez-vous que `root` existe avant de rendre l'application
if (root) {
    render(
        () => (
            <GlobalContext.Provider
                value={{
                session: sessionSignal,
                    edit: editSignal,
                    role: roleSignal
            }}
                >
                <Router root={App}>
                    <Route path="/" component={Adverts}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/adverts" component={Adverts}/>
                    <Route path="/planning" component={Planning}/>
                    <Route path="/profile" component={ProfilePage}/>

                    {/* Ajoutez plus de routes selon le besoin */}
                </Router>
            </GlobalContext.Provider>
            ),
        root
        );
}