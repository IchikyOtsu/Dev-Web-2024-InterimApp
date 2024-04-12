import { A } from "@solidjs/router";
// Navbar.tsx
import "./index.css";
import { ImDrawer } from 'solid-icons/im'
import { FaSolidCalendarDays } from 'solid-icons/fa'
import { AiFillWechat } from 'solid-icons/ai'
import { FaSolidChartSimple } from 'solid-icons/fa'
import { CgProfile } from 'solid-icons/cg'
export const Navbar = () => {
	return (
		<>
			<A href="/" class="logo">Proxideal</A>

			<nav class="navbar">
				<A href="/adverts" class="active">Adverts<ImDrawer class="nav-icon"/></A>
				<A href="/planning">Planning<FaSolidCalendarDays class="nav-icon"/></A>
				<A href="/chat">Chat<AiFillWechat class="nav-icon"/></A>
				<A href="/tracking">Tracking<FaSolidChartSimple class="nav-icon"/></A>
				<A href="/profile">Profile<CgProfile class="nav-icon"/></A>
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
