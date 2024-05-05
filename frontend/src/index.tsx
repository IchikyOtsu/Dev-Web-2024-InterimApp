// index.tsx
import { Route, Router } from "@solidjs/router";
import { createSignal, lazy } from "solid-js";
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
			<GlobalContextProvider>
				<Router root={App}>
					<Route path="/login" component={LoginPage} />
					<Route
						path="/"
						component={() => {
							return "han ouais";
							const { user } = useGlobalContext();
							if (user()?.role === "admin") {
								return (
									<ProtectedRoute
										component={Nope}
										allowedRoles={[]}
										redirectTo={"/users"}
									/>
								);
							} else if (
								user()?.role === "user" ||
								user()?.role === "enterprise"
							) {
								return (
									<ProtectedRoute
										component={Nope}
										allowedRoles={[]}
										redirectTo={"/adverts"}
									/>
								);
							} else {
								//return <ProtectedRoute component={Nope} allowedRoles={[]} redirectTo={"/login"} />;
							}
						}}
					/>
				</Router>
			</GlobalContextProvider>
		),
		root,
	);
}
