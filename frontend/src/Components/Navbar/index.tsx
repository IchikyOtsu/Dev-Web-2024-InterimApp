import { Link, Sidenav, Title } from "@jundao/design";
import { useLocation } from "@solidjs/router";
import {
	IoCalendar,
	IoChatbubbles,
	IoFileTrayFull,
	IoGrid,
	IoNotifications,
	IoPeople,
	IoPerson,
	IoReceipt,
	IoStatsChart,
} from "solid-icons/io";
// Navbar.tsx
import "./index.css";

export const Navbar = () => {
	return (
		<header id="header">
			<Link href="/" class="logo">
				Proxideal
			</Link>

			<nav class="navbar">
				<Link href="/adverts">
					Adverts
					<IoFileTrayFull class="nav-icon" />
				</Link>
				<Link href="/planning">
					Planning
					<IoCalendar class="nav-icon" />
				</Link>
				<Link href="/chat">
					Chat
					<IoChatbubbles class="nav-icon" />
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
		</header>
	);
};

export const EnterpriseNavbar = () => {
	return (
		<header id="header">
			<Link href="/" class="logo">
				Proxideal Enterprise
			</Link>

			<nav class="navbar">
				<Link href="/adverts">
					Adverts
					<IoFileTrayFull class="nav-icon" />
				</Link>
				<Link href="/planning">
					Planning
					<IoCalendar class="nav-icon" />
				</Link>
				<Link href="/chat">
					Chat
					<IoChatbubbles class="nav-icon" />
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
		</header>
	);
};

export const AdminNavbar = () => {
	return (
		<Sidenav class="admin-navbar">
			<div class="top">
				<Link href="/">
					<Title class="logoA">Proxideal Panel</Title>
				</Link>

				<FollowableLink href="/dashboard">
					<IoGrid class="nav-iconA" />
					Dashboard
				</FollowableLink>
				<FollowableLink href="/adverts">
					<IoFileTrayFull class="nav-iconA" />
					Adverts
				</FollowableLink>
				<FollowableLink href="/chat">
					<IoChatbubbles class="nav-iconA" />
					Chat
				</FollowableLink>
				<FollowableLink href="/finances">
					<IoStatsChart class="nav-iconA" />
					Finances
				</FollowableLink>
				<FollowableLink href="/payments">
					<IoReceipt class="nav-iconA" />
					Payments
				</FollowableLink>
				<FollowableLink href="/users">
					<IoPeople class="nav-iconA" />
					Users
				</FollowableLink>
			</div>

			<FollowableLink href="/profile">
				<IoPerson class="nav-iconA" />
				Profile
			</FollowableLink>
		</Sidenav>
	);
};

const FollowableLink = (props: { href: string; children: any }) => {
	const location = useLocation();

	return (
		<Sidenav.Link href={props.href} current={location.pathname === props.href}>
			{props.children}
		</Sidenav.Link>
	);
};
