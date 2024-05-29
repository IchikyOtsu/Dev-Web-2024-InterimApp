import { render, fireEvent, screen } from 'solid-testing-library';
import '@testing-library/jest-dom/extend-expect';
import AddUser from './index';

describe('AddUser Component', () => {
  test('renders without crashing', () => {
    render(() => <AddUser />);
    expect(screen.getByText("Ajouter l'utilisateur")).toBeInTheDocument();
  });

  test('validates email correctly', async () => {
    render(() => <AddUser />);
    
    const emailInput = screen.getByLabelText('Email');
    fireEvent.input(emailInput, { target: { value: 'invalidemail' } });
    
    const submitButton = screen.getByText("Ajouter l'utilisateur");
    fireEvent.click(submitButton);

    expect(screen.getByText('Adresse email invalide')).toBeInTheDocument();
  });

  test('shows success message on successful submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    render(() => <AddUser />);

    const emailInput = screen.getByLabelText('Email');
    const roleSelect = screen.getByLabelText('Rôle');
    
    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(roleSelect, { target: { value: 'user' } });

    const submitButton = screen.getByText("Ajouter l'utilisateur");
    fireEvent.click(submitButton);

    await screen.findByText('Utilisateur créé avec succès !');
    expect(screen.getByText('Utilisateur créé avec succès !')).toBeInTheDocument();
  });

  test('shows error message on failed submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject(new Error('Failed to create user')),
      })
    );

    render(() => <AddUser />);

    const emailInput = screen.getByLabelText('Email');
    const roleSelect = screen.getByLabelText('Rôle');
    
    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(roleSelect, { target: { value: 'user' } });

    const submitButton = screen.getByText("Ajouter l'utilisateur");
    fireEvent.click(submitButton);

    await screen.findByText('Error adding user: Failed to create user');
    expect(screen.getByText('Error adding user: Failed to create user')).toBeInTheDocument();
  });
});
