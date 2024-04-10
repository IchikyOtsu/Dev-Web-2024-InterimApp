// Components/Navbar/index.tsx
import { Role } from "../../context";
import { A } from "@solidjs/router";
import './index.css'

interface NavbarProps {
    role?: Role;
}

export const Navbar = (props: NavbarProps) => {
    return (
        <>
        <A href="/" class="logo">Proxideal</A>
        <nav>
            <A href="/adverts" class="active">Adverts<i class="bx bxs-inbox"></i></A>
            <A href="/planning">Planning<i class="bx bxs-calendar"></i></A>
            <A href="/tracking">Tracking<i class="bx bxs-bar-chart-alt-2"></i></A>
            <A href="/profile">Profile<i class="bx bxs-user"></i></A>
        </nav>
        </>
        );
};