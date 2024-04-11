import { createSignal } from 'solid-js';
import styles from './AddUser.module.css';

const AddUser = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email());
    console.log('Password:', password());
    setEmail('');
    setPassword('');
  };

  return (
    <div class={styles.profileCard}>
      <div class={styles.leftSection}>
        <img src="./src/assets/avatar.jpg" alt="Profile" class={styles.profilePicture} />
      </div>
      <form class={styles.form} onSubmit={handleSubmit}>
        <div>
          <label class={styles.label} for="email-input">Adresse mail</label>
          <input
            class={styles.input}
            id="email-input"
            type="email"
            placeholder="nomprenom@gmail.com"
            value={email()}
            onInput={handleEmailChange}
            required
          />
        </div>
        <div>
          <label class={styles.label} for="password-input">Mot de passe</label>
          <input
            class={styles.input}
            id="password-input"
            type="password"
            placeholder="Mot de passe"
            value={password()}
            onInput={handlePasswordChange}
            required
          />
        </div>
        <button class={styles.button} type="submit">Ajouter l'utilisateur</button>
      </form>
    </div>
    );
};

export default AddUser;