// index.tsx
import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";

import "@jundao/design/index.css";

// Fonts
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

import App from "./App";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute.tsx";
import { GlobalContext, useGlobalContext } from "./context";


// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Adverts = lazy(() => import("./pages/AdvertsPage"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const Nope = lazy(() => import("./pages/NonNonNon"));
const AdBusi = lazy(() => import("./pages/AdvertsBusiness"));
const NotifPage = lazy(() => import("./pages/Notifs"));
const UsersPage = lazy(() => import("./pages/Users"));
const LoginPage = lazy(() => import("./pages/Login"));

// Récupérez l'élément racine de manière sûre
const root = document.getElementById("root");

// Assurez-vous que `root` existe avant de rendre l'application
if (root) {
  render(
    () => (
      <GlobalContext.Provider value={useGlobalContext()}>
        <Router root={App}>
          <Route path="/login" component={LoginPage} />
          <Route path="/nope" component={Nope} />
          <Route
            path="/"
            component={() => {
              const { user } = useGlobalContext();
              if (user()?.role === "admin") {
                return <ProtectedRoute component={UsersPage} allowedRoles={["admin"]} />;
              } else if (user()?.role === "user") {
                return <ProtectedRoute component={Adverts} allowedRoles={["user"]} />;
              } else if (user()?.role === "enterprise") {
                return <ProtectedRoute component={AdBusi} allowedRoles={["enterprise"]} />;
              } else {
                return <ProtectedRoute component={LoginPage} allowedRoles={[]} redirectTo="/login" />;
              }
            }}
          />
          <Route
            path="/adverts"
            component={() =>
              useGlobalContext().user()?.role === "user" ? (
                <ProtectedRoute component={Adverts} allowedRoles={["user"]} />
              ) : (
                <ProtectedRoute component={AdBusi} allowedRoles={["enterprise"]} />
              )
            }
          />
          <Route
            path="/planning"
            component={() => <ProtectedRoute component={Planning} allowedRoles={["user"]} />}
          />
          <Route
            path="/profile"
            component={() => (
              <ProtectedRoute component={ProfilePage} allowedRoles={["user", "enterprise", "admin"]} />
            )}
          />
          <Route
            path="/notifications"
            component={() => (
              <ProtectedRoute component={NotifPage} allowedRoles={["user", "enterprise"]} />
            )}
          />
          <Route
            path="/users"
            component={() => <ProtectedRoute component={UsersPage} allowedRoles={["admin"]} />}
          />
        </Router>
      </GlobalContext.Provider>
	  ),
	root
);
}