import { useNavigate } from "@solidjs/router";
// ProtectedRoute.tsx
import { type Component, Show } from "solid-js";
import { useGlobalContext } from "../../context.tsx";

interface ProtectedRouteProps {
	component: Component;
	allowedRoles: string[];
}

export const ProtectedRoute: Component<ProtectedRouteProps> = (props) => {
	const navigate = useNavigate();
	const { user } = useGlobalContext();

	const isAllowed = () => {
		if (user) {
			return props.allowedRoles.includes(user.role);
		}
		return false;
	};

	return (
		<Show
			when={isAllowed()}
			fallback={() => navigate("/nope", { replace: true })}
		>
			<props.component />
		</Show>
	);
};
