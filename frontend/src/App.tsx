// App.tsx

import { Navbar } from "./Components/Navbar";
import { useGlobalContext } from "./context";
import './style.css'
const App = () => {
    const { role } = useGlobalContext();
    const userRole = role.toString();
    return (
        <div>
            <header id="header">
                {userRole === "user" && <Navbar />}
            </header>
            <main></main>
        </div>
        );
};

export default App;