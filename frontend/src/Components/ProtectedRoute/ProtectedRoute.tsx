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
	const { user, session } = useGlobalContext();

	const isAllowed = () => {
		if (user[0]()) {
			console.log(`Rôle de l'utilisateur : ${user[0]()?.role}`); // Afficher le rôle de l'utilisateur dans la console
			return props.allowedRoles.includes(user[0]()?.role);
		}
		return false;
	};

	if (!session[0]()) return;

	if (!isAllowed()) {
		if (props.redirectTo) {
			navigate(props.redirectTo, { replace: true });
		} else {
			navigate("*", { replace: true }); // Rediriger vers /nope si l'accès est refusé
		}
		return <></>;
	}

	return <props.component />;
};
