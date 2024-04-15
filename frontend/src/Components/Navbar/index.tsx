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
				<Link href="/advert" class="active">
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

export const AdminNavbar = () => {
	return (
		<>
			<Link href="/" class="logo">
				Proxideal Panel
			</Link>

			<nav class="navbar">
				<Link href="/tracking" class="active">
					Tracking<i class="bx bxs-inbox"></i>
				</Link>
				<Link href="/register">
					Register<i class="bx bxs-user"></i>
				</Link>
			</nav>
		</>
	);
};
