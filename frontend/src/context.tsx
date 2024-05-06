// context.tsx
import { createContext, useContext } from "solid-js";

export type Role = "user" | "enterprise" | "admin";

export interface User {
	id?: number;
	email: string;
	role: Role;
	enterprise_id?: number;
}

export interface Enterprise {
	id?: number;
	name: string;
	description: string;
	logo_url: string;
	website_url: string;
}

export interface GlobalContextData {
	user: {
		(): User | undefined;
		state: "unresolved" | "pending" | "ready" | "refreshing" | "errored";
		loading: boolean;
		error: any;
		latest: User | undefined;
	};
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
