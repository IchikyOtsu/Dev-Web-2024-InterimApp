// App.tsx

import { Space } from "@jundao/design";
import { AdminNavbar, EnterpriseNavbar, Navbar } from "./Components/Navbar";
import { useGlobalContext } from "./context";

const App = (props) => {
	const { user } = useGlobalContext();
	const userRole = user?.role;

	return (
		<Space vertical={userRole !== "admin"}>
			{userRole === "user" && <Navbar />}
			{userRole === "enterprise" && <EnterpriseNavbar />}
			{userRole === "admin" && <AdminNavbar />}
			<main
				style={{
					width: "100%",
					"margin-top": userRole === "admin" ? "2rem" : "6rem",
				}}
			>
				{props.children}
			</main>
		</Space>
	);
};

export default App;
