import { createEffect, createSignal } from 'solid-js';

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
