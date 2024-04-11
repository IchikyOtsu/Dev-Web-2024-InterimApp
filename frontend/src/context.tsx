// context.tsx

import { createContext, useContext } from "solid-js";
import { AuthSession } from "@supabase/supabase-js";

export type Role = "user" | "enterprise";

export interface GlobalContextData {
    session: AuthSession | "loading";
    edit: boolean;
    role: Role;
}

export const GlobalContext = createContext<GlobalContextData>({
    session: "loading",
    edit: false,
    role: "enterprise"
});

export function useGlobalContext() {
    return useContext(GlobalContext);
}