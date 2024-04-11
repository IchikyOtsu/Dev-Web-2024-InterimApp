import { createSignal } from 'solid-js';
import './index.css';


const AddUser = () => {

  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Effectuer les actions nécessaires, par exemple envoyer les données à un backend
    console.log('Email:', email());
    console.log('Password:', password());
    // Réinitialiser les champs après la soumission si nécessaire
    setEmail('');
    setPassword('');
   }
  return (
    <div class="profile-card">
      <div class="left-section">
        <img src="./public/avatar.jpg" alt="Profile" class="profile-picture" />
      </div>
      <form onSubmit={handleSubmit}>
        <div id="email">
          <label for="email-input">Adresse mail</label>
          <input
            id="email-input"
            type="email"
            placeholder="nomprenom@gmail.com"
            value={email()}
            onInput={handleEmailChange}
            required
          />
        </div>
        <div id="password">
          <label for="password-input">Mot de passe</label>
          <input
            id="password-input"
            type="password"
            placeholder="Mot de passe"
            value={password()}
            onInput={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Ajouter l'utilisateur</button>
      </form>
    </div>
  );
};

export default AddUser;