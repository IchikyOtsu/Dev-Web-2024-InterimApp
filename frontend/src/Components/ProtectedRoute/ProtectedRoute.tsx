// ProtectedRoute.tsx
import { Component, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useGlobalContext } from '../../context.tsx';

interface ProtectedRouteProps {
    component: Component;
    allowedRoles: string[];
}
export const ProtectedRoute: Component<ProtectedRouteProps> = (props) => {
  const navigate = useNavigate();
  const { role } = useGlobalContext();

  const isAllowed = () => props.allowedRoles.includes(role);

  return (
    <Show when={isAllowed()} fallback={() => navigate('/nope', { replace: true })}>
      <props.component />
    </Show>
  );
};