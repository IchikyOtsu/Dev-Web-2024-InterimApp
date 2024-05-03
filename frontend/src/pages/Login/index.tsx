// pages/Login/index.tsx
import { Button, Checkbox, Input, Space, Text } from "@jundao/design";
import { createSignal } from "solid-js";
import { useGlobalContext } from "../../context";

const LoginPage = () => {
  const { session } = useGlobalContext();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [invalid, setInvalid] = createSignal(false);

  const signInWithEmail = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email(),
          password: password(),
        }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        window.location.reload();
      } else {
        setInvalid(true);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setInvalid(true);
    }
  };

  return (
    <Space vertical>
      <Text>Connexion</Text>
      <Input
        style="min-width: 10.75rem"
        type="email"
        invalid={invalid()}
        value={email()}
        onChange={(email) => {
          setInvalid(false);
          setEmail(email);
        }}
        placeholder="Entrez votre email"
        required
      />
      <Input
        style="min-width: 10.75rem"
        type={showPassword() ? "" : "password"}
        invalid={invalid()}
        errorMessage="Email ou mot de passe invalide"
        value={password()}
        onChange={(password) => {
          setInvalid(false);
          setPassword(password);
        }}
        placeholder="Entrez votre mot de passe"
        required
      />
      <Checkbox
        size="small"
        label="Montrer le mot de passe"
        onChange={() => setShowPassword((psw) => !psw)}
      />
      <Button type="primary" onClick={() => signInWithEmail()}>
        Se connecter
</Button>
</Space>
);
};

export default LoginPage;