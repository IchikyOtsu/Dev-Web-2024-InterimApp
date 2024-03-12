import { createEffect, createSignal } from 'solid-js/types/server/reactive.js';
import './index.css';

const Navbar = () => {
    
    /*const [message, setMessage] = createSignal("J'attends...");

    createEffect(() => {
        fetch('/adverts')
        .then(res => res.json())
        .then(data => setMessage(data.message))
        .catch(err => console.error("API call failed:", err));
    });*/

    return (
        <>
        <a href="/" class="logo">Proxideal</a>

        <nav class="navbar">
            <a href="/adverts" class="active">Adverts<i class='bx bxs-inbox'></i></a>
            <a href="/planning">Planning<i class='bx bxs-calendar' ></i></a>
            <a href="/chat">Chat<i class='bx bxs-chat' ></i></a>
            <a href="/tracking">Tracking<i class='bx bxs-bar-chart-alt-2' ></i></a>
            <a href="/profile">Profile<i class='bx bxs-user'></i></a>
        </nav>
        {/* <div>{message()}</div> */}
        </>
    );
};

export default Navbar