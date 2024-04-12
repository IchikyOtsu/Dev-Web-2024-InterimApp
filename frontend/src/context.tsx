// context.tsx
import type { AuthSession } from "@supabase/supabase-js";
import { createContext, useContext } from "solid-js";

export type Role = "user" | "enterprise";

export interface User {
    id: number;
    username: string;
    email: string;
    role: Role;
    enterprise_id: number | null;
}

export interface GlobalContextData {
    session: AuthSession | "loading";
    edit: boolean;
    user: User | null;
}

const hardcodedUser: User = {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
	role: "user",
	enterprise_id: null,
};

/*const hardcodedUser: User = {
    id: 3,
    username: "acme_inc",
    email: "contact@acme.com",
    role: "enterprise",
    enterprise_id: 1,
};*/

export const globalContextData: GlobalContextData = {
	session: "loading",
	edit: false,
	user: hardcodedUser,
};

export const GlobalContext = createContext<GlobalContextData>(globalContextData);

export function useGlobalContext() {
	return useContext(GlobalContext);
}