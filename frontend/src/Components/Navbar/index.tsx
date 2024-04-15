import { Link } from "@jundao/design";
// Navbar.tsx
import "./index.css";

export const Navbar = () => {
	return (
		<>
			<Link href="/" class="logo">
				Proxideal
			</Link>

			<nav class="navbar">
				<Link href="/adverts" class="active">
					Adverts<i class="bx bxs-inbox"></i>
				</Link>
				<Link href="/planning">
					Planning<i class="bx bxs-calendar"></i>
				</Link>
				<Link href="/chat">
					Chat<i class="bx bxs-chat"></i>
				</Link>
				<Link href="/notifications">
					Notifications<i class="bx bxs-bar-chart-alt-2"></i>
				</Link>
				<Link href="/profile">
					Profile<i class="bx bxs-user"></i>
				</Link>
			</nav>
		</>
	);
};

export const EnterpriseNavbar = () => {
	return (
		<>
			<Link href="/" class="logo">
				Proxideal Enterprise
			</Link>

			<nav class="navbar">
				<Link href="/advertE" class="active">
					Adverts<i class="bx bxs-inbox"></i>
				</Link>
				<Link href="/planningE">
					Planning<i class="bx bxs-calendar"></i>
				</Link>
				<Link href="/chatE">
					Chat<i class="bx bxs-chat"></i>
				</Link>
				<Link href="/notifications">
					Notifications<i class="bx bxs-bar-chart-alt-2"></i>
				</Link>
				<Link href="/profileE">
					Profile<i class="bx bxs-user"></i>
				</Link>
			</nav>
		</>
	);
};
