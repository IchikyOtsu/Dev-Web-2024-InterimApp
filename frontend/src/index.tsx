import { Route, Router } from "@solidjs/router";
// index.tsx
import { lazy } from "solid-js";
import { render } from "solid-js/web";
//import "@jundao/design/index.css";

import App from "./App";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute.tsx";
import { GlobalContext, globalContextData } from "./context";

// Lazy-loading des composants de page
const Planning = lazy(() => import("./pages/Planning"));
const Login = lazy(() => import("./pages/Login"));
const Adverts = lazy(() => import("./pages/Adverts"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const Nope = lazy(() => import("./pages/NonNonNon"));
const AdBusi = lazy(() => import("./pages/AdvertBusiness.tsx"));
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
                        component={() => (
                            <ProtectedRoute
                                component={Adverts}
                                allowedRoles={["user"]}
                                redirectTo="/advertE"
                            />
                        )}
                    />
                    <Route
                        path="/adverts"
                        component={() => (
                            <ProtectedRoute
                                component={Adverts}
                                allowedRoles={["user"]}
                            />
                        )}
                    />
                    <Route
                        path="/planning"
                        component={() => (
                            <ProtectedRoute
                                component={Planning}
                                allowedRoles={["user"]}
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
						path="/advertE"
						component={() => (
							<ProtectedRoute
								component={AdBusi}
								allowedRoles={["enterprise"]}
								redirectTo="/adverts"
							/>
							)}
					/>
				</Router>
			</GlobalContext.Provider>
			),
		root
		);
}