import { Link } from "@jundao/design";
import { IoChatbubblesSharp } from "solid-icons/io";
import { IoPerson } from "solid-icons/io";
import { IoCalendar } from "solid-icons/io";
import { IoFileTrayFull } from "solid-icons/io";
import { IoNotifications } from "solid-icons/io";
import { IoStatsChart } from "solid-icons/io";
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
					Adverts
					<IoFileTrayFull class="nav-icon" />
				</Link>
				<Link href="/planning">
					Planning
					<IoCalendar class="nav-icon" />
				</Link>
				<Link href="/chat">
					Chat
					<IoChatbubblesSharp class="nav-icon" />
				</Link>
				<Link href="/notifications">
					Notifications
					<IoNotifications class="nav-icon" />
				</Link>
				<Link href="/profile">
					Profile
					<IoPerson class="nav-icon" />
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
					Adverts
					<IoFileTrayFull class="nav-icon" />
				</Link>
				<Link href="/planning">
					Planning
					<IoCalendar class="nav-icon" />
				</Link>
				<Link href="/chat">
					Chat
					<IoChatbubblesSharp class="nav-icon" />
				</Link>
				<Link href="/notifications">
					Notifications
					<IoNotifications class="nav-icon" />
				</Link>
				<Link href="/profile">
					Profile
					<IoPerson class="nav-icon" />
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
					Tracking
					<IoStatsChart />
				</Link>
				<Link href="/register">
					Register
					<IoPerson class="nav-icon" />
				</Link>
			</nav>
		</>
	);
};
