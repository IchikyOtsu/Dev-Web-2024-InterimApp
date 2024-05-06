// App.tsx
import "./App.css";
import { Space } from "@jundao/design";
import { useLocation, useNavigate } from "@solidjs/router";
import { type JSX, Show, createEffect } from "solid-js";
import { AdminNavbar, Navbar } from "./Components/Navbar";
import { useGlobalContext } from "./context";

const App = (props: { children: JSX.Element }) => {
	const { user } = useGlobalContext();
	const userRole = () => user()?.role;

	const navigate = useNavigate();
	const location = useLocation();

	createEffect(() => {
		if (!user.loading && !user() && location.pathname !== "/login") {
			navigate("/login");
		}
	});

	return (
		<Show when={user()} fallback={props.children}>
			<Space vertical={userRole() !== "admin"}>
				<Show when={userRole() === "admin"} fallback={<Navbar />}>
					<AdminNavbar />
				</Show>
				<main
					style={
						userRole() === "admin"
							? {
									"padding-top": "1rem",
									"max-height": "97dvh",
									"overflow-y": "scroll",
								}
							: {}
					}
				>
					{props.children}
				</main>
			</Space>
		</Show>
	);
};

export default App;
