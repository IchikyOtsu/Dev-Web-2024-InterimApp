// index.tsx
import { Navigate, Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";

import "@jundao/design/index.css";

// Fonts
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

import App from "./App";
import { GlobalContextProvider } from "./Components/GlobalContextProvider.tsx";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute.tsx";
import { useGlobalContext } from "./context";

// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Adverts = lazy(() => import("./pages/AdvertsPage"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const Nope = lazy(() => import("./pages/NonNonNon"));
const AdvertsBusiness = lazy(() => import("./pages/AdvertsBusiness"));
const NotifPage = lazy(() => import("./pages/Notifs"));
const UsersPage = lazy(() => import("./pages/Users"));
const LoginPage = lazy(() => import("./pages/Login"));

// Récupérez l'élément racine de manière sûre
const root = document.getElementById("root");

// Assurez-vous que `root` existe avant de rendre l'application
if (root) {
	render(
		() => (
			<GlobalContextProvider>
				<Router root={App}>
					<Route path="/login" component={LoginPage} />
					<Route path="/nope" component={Nope} />
					<Route
						path="/"
						component={() => {
							const { user } = useGlobalContext();
							if (user()?.role === "admin") {
								return <Navigate href="/users" />;
							}
							if (user()?.role === "user" || user()?.role === "enterprise") {
								return <Navigate href="/adverts" />;
							}
						}}
					/>
					<Route
						path="/adverts"
						component={() => {
							const { user } = useGlobalContext();
							if (user()?.role === "user") {
								return <Adverts />;
							}
							if (user()?.role === "enterprise") {
								return <AdvertsBusiness />;
							}
							return <Nope />;
						}}
					/>
					<Route
						path="/planning"
						component={() => (
							<ProtectedRoute component={Planning} allowedRoles={["user"]} />
						)}
					/>
					<Route
						path="/profile"
						component={() => (
							<ProtectedRoute
								component={ProfilePage}
								allowedRoles={["user", "enterprise", "admin"]}
							/>
						)}
					/>
					<Route
						path="/notifications"
						component={() => (
							<ProtectedRoute
								component={NotifPage}
								allowedRoles={["user", "enterprise"]}
							/>
						)}
					/>
					<Route
						path="/users"
						component={() => (
							<ProtectedRoute component={UsersPage} allowedRoles={["admin"]} />
						)}
					/>
					<Route path="*" component={Nope} />
				</Router>
			</GlobalContextProvider>
		),
		root,
	);
}
