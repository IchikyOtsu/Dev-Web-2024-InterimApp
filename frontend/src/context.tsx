// context.tsx
import { createContext, useContext, createEffect, createSignal } from "solid-js";
import jwt_decode, {jwtDecode, JwtPayload} from "jwt-decode";

export type Role = "user" | "enterprise" | "admin";

export interface User {
	id: number;
	username: string;
	email: string;
	role: Role;
	enterprise_id: number | null;
}

interface CustomJwtPayload extends JwtPayload {
	userId: number;
	username: string;
	email: string;
	role: Role;
	enterprise_id: number | null;
}

export interface GlobalContextData {
	user: User | null;
	setUser: (user: User | null) => void;
	session: string | null;
	setSession: (session: string | null) => void;
}

export const GlobalContext = createContext<GlobalContextData>({
	user: null,
	setUser: () => {},
	session: null,
	setSession: () => {},
});

export function useGlobalContext() {
	const [user, setUser] = createSignal<User | null>(null);
	const [session, setSession] = createSignal<string | null>(null);

	createEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decodedToken = jwtDecode<CustomJwtPayload>(token);
				setUser({
					id: decodedToken.userId,
					username: decodedToken.username,
					email: decodedToken.email,
					role: decodedToken.role,
					enterprise_id: decodedToken.enterprise_id,
				});
				setSession(token);
			} catch (error) {
				console.error("Invalid token:", error);
				localStorage.removeItem("token");
				setUser(null);
				setSession(null);
			}
		}
	});

	return { user, setUser, session, setSession };
}