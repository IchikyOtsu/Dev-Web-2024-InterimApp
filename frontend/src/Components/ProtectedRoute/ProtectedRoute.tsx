import { useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";
import { useGlobalContext } from "../../context.tsx";

interface ProtectedRouteProps {
	component: Component;
	allowedRoles: string[];
	redirectTo?: string;
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

	if (!isAllowed() && props.redirectTo) {
		navigate(props.redirectTo, { replace: true });
		return <></>;
	}

	return <props.component />;
};
