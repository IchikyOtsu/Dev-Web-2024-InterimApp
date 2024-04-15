import { Route, Router } from "@solidjs/router";
// index.tsx
import { lazy } from "solid-js";
import { render } from "solid-js/web";

import "@jundao/design/index.css";

// Fonts
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

import App from "./App";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute.tsx";
import { GlobalContext, globalContextData, useGlobalContext } from "./context";

// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Login = lazy(() => import("./pages/Login"));
const Adverts = lazy(() => import("./pages/AdvertsPage"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const Nope = lazy(() => import("./pages/NonNonNon"));
const AdBusi = lazy(() => import("./pages/AdvertBusiness"));
const NotifPage = lazy(() => import("./pages/Notifs"));
const Regi = lazy(() => import("./pages/Register"));
// Récupérez l'élément racine de manière sûre
const root = document.getElementById("root");

// Assurez-vous que `root` existe avant de rendre l'application
if (root) {
	render(
		() => (
			<GlobalContext.Provider value={globalContextData}>
				<Router root={App}>
					<Route path="/login" component={Login} />
					<Route path="/nope" component={Nope} />
					<Route
						path="/"
						component={() => {
							if (useGlobalContext().user?.role === "admin") {
								return (
									<ProtectedRoute component={Regi} allowedRoles={["admin"]} />
								);
							} else {
								return (
									<ProtectedRoute
										component={Adverts}
										allowedRoles={[]}
										redirectTo="/adverts"
									/>
								);
							}
						}}
					/>
					<Route
						path="/adverts"
						component={() =>
							useGlobalContext().user?.role == "user" ? (
								<ProtectedRoute component={Adverts} allowedRoles={["user"]} />
							) : (
								<ProtectedRoute
									component={AdBusi}
									allowedRoles={["enterprise"]}
								/>
							)
						}
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
								allowedRoles={["user", "enterprise"]}
							/>
						)}
					/>
					<Route
						path="/advertE"
						component={() => (
							<ProtectedRoute
								component={AdBusi}
								allowedRoles={["enterprise"]}
								redirectTo="/adverts"
							/>
						)}
					/>
					<Route
						path="/profile"
						component={() => (
							<ProtectedRoute
								component={ProfilePage}
								allowedRoles={["user", "enterprise"]}
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
						path="/register"
						component={() => (
							<ProtectedRoute component={Regi} allowedRoles={["admin"]} />
						)}
					/>
				</Router>
			</GlobalContext.Provider>
		),
		root,
	);
}
