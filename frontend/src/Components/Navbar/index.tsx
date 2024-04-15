import { A } from "@solidjs/router";
// Navbar.tsx
import "./index.css";

export const Navbar = () => {
	return (
		<>
			<A href="/" class="logo">
				Proxideal
			</A>

			<nav class="navbar">
				<A href="/adverts" class="active">
					Adverts<i class="bx bxs-inbox"></i>
				</A>
				<A href="/planning">
					Planning<i class="bx bxs-calendar"></i>
				</A>
				<A href="/chat">
					Chat<i class="bx bxs-chat"></i>
				</A>
				<A href="/notifications">
					Notifications<i class="bx bxs-bar-chart-alt-2"></i>
				</A>
				<A href="/profile">
					Profile<i class="bx bxs-user"></i>
				</A>
			</nav>
		</>
	);
};

export const EnterpriseNavbar = () => {
	return (
		<>
			<A href="/" class="logo">
				Proxideal Enterprise
			</A>

			<nav class="navbar">
				<A href="/advert" class="active">
					Adverts<i class="bx bxs-inbox"></i>
				</A>
				<A href="/planning">
					Planning<i class="bx bxs-calendar"></i>
				</A>
				<A href="/chat">
					Chat<i class="bx bxs-chat"></i>
				</A>
				<A href="/notifications">
					Notifications<i class="bx bxs-bar-chart-alt-2"></i>
				</A>
				<A href="/profile">
					Profile<i class="bx bxs-user"></i>
				</A>
			</nav>
		</>
	);
};

export const AdminNavbar = () => {
	return (
		<>
			<A href="/" class="logo">
				Proxideal Panel
			</A>

			<nav class="navbar">
				<A href="/tracking" class="active">
					Tracking<i class="bx bxs-inbox"></i>
				</A>
				<A href="/register">
					Register<i class="bx bxs-user"></i>
				</A>
			</nav>
		</>
	);
};
