// Navbar.tsx
import './index.css';
import { A } from "@solidjs/router";

export const Navbar = () => {
    return (
        <>
            <A href="/" class="logo">Proxideal</A>

            <nav class="navbar">
                <A href="/adverts" class="active">Adverts<i class='bx bxs-inbox'></i></A>
                <A href="/planning">Planning<i class='bx bxs-calendar'></i></A>
                <A href="/chat">Chat<i class='bx bxs-chat'></i></A>
                <A href="/tracking">Tracking<i class='bx bxs-bar-chart-alt-2'></i></A>
                <A href="/profile">Profile<i class='bx bxs-user'></i></A>
            </nav>
        </>
        );
};

export const EnterpriseNavbar = () => {
    return (
        <>
        <A href="/" class="logo">Proxideal Enterprise</A>

        <nav class="navbar">
            <A href="/dashboard">Dashboard<i class='bx bxs-dashboard'></i></A>
            <A href="/manage-users">Manage Users<i class='bx bxs-user-detail'></i></A>
            <A href="/analytics">Analytics<i class='bx bxs-bar-chart-alt-2'></i></A>
            <A href="/settings">Settings<i class='bx bxs-cog'></i></A>
        </nav>
        </>
        );
};