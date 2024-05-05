import type { JwtPayload } from "jwt-decode";
// context.tsx
import { type Accessor, Signal, createContext, useContext } from "solid-js";

export type Role = "user" | "enterprise" | "admin";

export interface User {
	id: number;
	username: string;
	email: string;
	role: Role;
	enterprise_id: number | null;
}

interface CustomJwtPayload extends JwtPayload {
	id: number;
	email: string;
	role: Role;
	enterprise_id: number | null;
}

export interface GlobalContextData {
	user: Accessor<User | undefined>;
	refetch: () => void;
}

export const GlobalContext = createContext<GlobalContextData>();

export function useGlobalContext() {
	const context = useContext(GlobalContext);

	if (context === undefined) {
		throw new Error(
			"`useGlobalContext` must be used within the inside `GlobalContext.Provider`",
		);
	}

	return context;
}
