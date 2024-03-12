import { createEffect, createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import Navbar from './Components/Navbar/index.tsx';

const header = document.getElementById("header");
render(() => <Navbar />, header!);

function App() {
  const [message, setMessage] = createSignal("Loading...");

  createEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("API call failed:", err));
  });

  return (
    <div>
      <h1>{message()}</h1>
    </div>
  );
}

export default App;
