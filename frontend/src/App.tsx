// App.tsx

import { Navbar, EnterpriseNavbar } from "./Components/Navbar";
import { useGlobalContext } from "./context";
import './style.css'

const App = (props) => {
    const { role } = useGlobalContext();
    const userRole = role;

    return (
        <div>
            <header id="header">
                {userRole === "user" && <Navbar />}
                {userRole === "enterprise" && <EnterpriseNavbar />}
            </header>
            <main>{props.children}</main>
        </div>
        );
};

export default App;