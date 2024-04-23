import { Link } from "@jundao/design";
import {
	IoCalendar,
	IoChatbubblesSharp,
	IoFileTrayFull,
	IoNotifications,
	IoPeopleSharp,
	IoPerson,
	IoStatsChart,
} from "solid-icons/io";
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
				<Link href="/users">
					Users
					<IoPeopleSharp class="nav-icon" />
				</Link>
			</nav>
		</>
	);
};
