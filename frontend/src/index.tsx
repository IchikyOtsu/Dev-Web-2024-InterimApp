import { createSignal, lazy, createEffect } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route, useNavigate } from "@solidjs/router";

import App from "./App";
import { AuthSession } from "@supabase/supabase-js";
import { supabaseClient } from "./supabase";
import { Role, useGlobalContext, GlobalContext, getUserRole } from "./context";

// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Login = lazy(() => import("./pages/Login"));
const Adverts = lazy(() => import("./pages/Adverts"));
const ProfilePage = lazy(() => import("./pages/Profile"));

const root = document.getElementById("root");

const sessionSignal = createSignal<AuthSession | "loading">("loading");
const editSignal = createSignal(false);
const roleSignal = createSignal<Role>("user");

supabaseClient.auth.getSession().then(({ data }) => {
    if (data.session) {
        sessionSignal[1](data.session);
        const role = getUserRole(data.session.user);
        roleSignal[1](role);
    } else {
        sessionSignal[1]("loading");
    }
});

if (root) {
    render(
        () => (
            <GlobalContext.Provider
                value={{ session: sessionSignal, edit: editSignal, role: roleSignal }}
            >
                <Router>
                    <Route path="/" component={Adverts} />
                    <Route path="/login" component={Login} />
                    <Route path="/adverts" component={Adverts} />
                    <Route path="/planning" component={Planning} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="*" component={AppWithNavigation} />
                </Router>
            </GlobalContext.Provider>
        ),
        root
    );
}

function AppWithNavigation() {
    const { role } = useGlobalContext();

    createEffect(() => {
        if (typeof role[0] === "string") {
            if (role[0] === "user") {
                useNavigate("/adverts");
            } else if (role[0] === "enterprise") {
                useNavigate("/adverts");
            } else if (role[0] === "admin") {
                useNavigate("/admin-dashboard");
            }
        }
    });

    return <App role={role[0]} />;
}