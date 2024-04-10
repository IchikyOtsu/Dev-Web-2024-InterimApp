// App.tsx
import { Navbar } from "./Components/Navbar";
import { useGlobalContext } from "./context";
import './style.css'

const App = (props) => {
    const { role } = useGlobalContext();

    return (
        <div>
            <header id="header">
                {typeof role[0] === "string" && role[0] === "user" && <Navbar />}
            </header>
            <main>{props.children}</main>
        </div>
        );
};

export default App;