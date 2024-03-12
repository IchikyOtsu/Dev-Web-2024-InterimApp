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

//Je suis le commentaire de Bruno qui est là comme test pour Mister Noël.