// App.tsx
import "./App.css";
import { Space } from "@jundao/design";
import { useLocation, useNavigate } from "@solidjs/router";
import { type JSX, Show, createEffect } from "solid-js";
import { AdminNavbar, Navbar } from "./Components/Navbar";
import { useGlobalContext } from "./context";

const App = (props: { children: JSX.Element }) => {
	const { user, refetch } = useGlobalContext();
	const userRole = () => user()?.role;

	console.log(user());

	const navigate = useNavigate();
	const location = useLocation();

	createEffect(() => {
		if (!user() && location.pathname !== "/login") {
			navigate("/login");
		}
	});

	return (
		<Show when={user()} fallback={props.children}>
			<Space vertical={userRole() !== "admin"}>
				<Show when={userRole() === "admin"} fallback={<Navbar />}>
					<AdminNavbar />
				</Show>
				<main style={userRole() === "admin" ? { "margin-top": "2rem" } : {}}>
					{props.children}
				</main>
			</Space>
		</Show>
	);
};

export default App;
