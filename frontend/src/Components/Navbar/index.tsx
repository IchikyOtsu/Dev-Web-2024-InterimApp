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
import type { JSX } from "solid-js";
// Navbar.tsx
import "./index.css";

export const Navbar = () => {
	return (
		<header id="header">
			<Link href="/" class="logo">
				Proxideal
			</Link>

			<nav class="navbar">
				<FollowableLink href="/adverts">
					Adverts
					<IoFileTrayFull class="nav-icon" />
				</FollowableLink>
				<FollowableLink href="/planning">
					Planning
					<IoCalendar class="nav-icon" />
				</FollowableLink>
				<FollowableLink href="/chat">
					Chat
					<IoChatbubbles class="nav-icon" />
				</FollowableLink>
				<FollowableLink href="/notifications">
					Notifications
					<IoNotifications class="nav-icon" />
				</FollowableLink>
				<FollowableLink href="/profile">
					Profile
					<IoPerson class="nav-icon" />
				</FollowableLink>
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
				<FollowableLink href="/adverts">
					Adverts
					<IoFileTrayFull class="nav-icon" />
				</FollowableLink>
				<FollowableLink href="/planning">
					Planning
					<IoCalendar class="nav-icon" />
				</FollowableLink>
				<FollowableLink href="/chat">
					Chat
					<IoChatbubbles class="nav-icon" />
				</FollowableLink>
				<FollowableLink href="/notifications">
					Notifications
					<IoNotifications class="nav-icon" />
				</FollowableLink>
				<FollowableLink href="/profile">
					Profile
					<IoPerson class="nav-icon" />
				</FollowableLink>
			</nav>
		</header>
	);
};

export const AdminNavbar = () => {
	return (
		<Sidenav class="admin-navbar">
			<Link href="/">
				<Title class="logoA">Proxideal Panel</Title>
			</Link>

			<FollowableSidenavLink href="/dashboard">
				<IoGrid class="nav-iconA" />
				Dashboard
			</FollowableSidenavLink>
			<FollowableSidenavLink href="/adverts">
				<IoFileTrayFull class="nav-iconA" />
				Adverts
			</FollowableSidenavLink>
			<FollowableSidenavLink href="/chat">
				<IoChatbubbles class="nav-iconA" />
				Chat
			</FollowableSidenavLink>
			<FollowableSidenavLink href="/finances">
				<IoStatsChart class="nav-iconA" />
				Finances
			</FollowableSidenavLink>
			<FollowableSidenavLink href="/payments">
				<IoReceipt class="nav-iconA" />
				Payments
			</FollowableSidenavLink>
			<FollowableSidenavLink href="/users">
				<IoPeople class="nav-iconA" />
				Users
			</FollowableSidenavLink>

			<FollowableSidenavLink href="/profile">
				<IoPerson class="nav-iconA" />
				Profile
			</FollowableSidenavLink>
		</Sidenav>
	);
};

const FollowableLink = (props: {
	href: string;
	children: JSX.Element;
	class?: string;
	style?: string;
}) => {
	const location = useLocation();

	return (
		<Link
			href={props.href}
			class={props.class}
			style={
				(location.pathname === props.href ? "color: var(--jdd-blue-7);" : "") +
				props.style
			}
		>
			{props.children}
		</Link>
	);
};

const FollowableSidenavLink = (props: {
	href: string;
	children: JSX.Element;
	class?: string;
	style?: JSX.CSSProperties | string;
}) => {
	const location = useLocation();

	return (
		<Sidenav.Link
			href={props.href}
			current={location.pathname === props.href}
			class={props.class}
			style={props.style}
		>
			{props.children}
		</Sidenav.Link>
	);
};
