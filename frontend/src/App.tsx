import { Space } from "@jundao/design";
import { type JSX, Show } from "solid-js";
// App.tsx
import "./App.css";
import { AdminNavbar, Navbar } from "./Components/Navbar";
import { useGlobalContext } from "./context";
import LoginPage from "./pages/Login";

const App = (props: { children: JSX.Element }) => {
	const { user } = useGlobalContext();
	const userRole = user?.role;

	return (
		<Show when={user} fallback={<LoginPage />}>
			<Space vertical={userRole !== "admin"}>
				{(userRole === "user" || userRole === "enterprise") && <Navbar />}
				{userRole === "admin" && <AdminNavbar />}
				<main style={userRole === "admin" ? { "margin-top": "2rem" } : {}}>
					{props.children}
				</main>
			</Space>
		</Show>
	);
};

export default App;
