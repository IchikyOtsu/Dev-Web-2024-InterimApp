import { useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";
import { useGlobalContext } from "../../context.tsx";
import NonNonNon from "../../pages/NonNonNon";

interface ProtectedRouteProps {
	component: Component;
	allowedRoles: string[];
	redirectTo?: string;
}

export const ProtectedRoute: Component<ProtectedRouteProps> = (props) => {
	const navigate = useNavigate();
	const { user } = useGlobalContext();

	const isAllowed = () => {
		if (user()) {
			//console.log(`Rôle de l'utilisateur : ${user()?.role}`); // Afficher le rôle de l'utilisateur dans la console
			return props.allowedRoles.includes(user()?.role);
		}
		return false;
	};

	if (!user()) return;

	if (!isAllowed()) {
		if (props.redirectTo) {
			navigate(props.redirectTo, { replace: true });
		} else {
			return <NonNonNon />; // Rediriger vers /nope si l'accès est refusé
		}
		return <></>;
	}

	return <props.component />;
};
