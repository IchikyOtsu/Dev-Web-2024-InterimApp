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
				<A href="/advertE" class="active">
					Adverts<i class="bx bxs-inbox"></i>
				</A>
				<A href="/planningE">
					Planning<i class="bx bxs-calendar"></i>
				</A>
				<A href="/chatE">
					Chat<i class="bx bxs-chat"></i>
				</A>
				<A href="/notifications">
					Notifications<i class="bx bxs-bar-chart-alt-2"></i>
				</A>
				<A href="/profileE">
					Profile<i class="bx bxs-user"></i>
				</A>
			</nav>
		</>
	);
};
