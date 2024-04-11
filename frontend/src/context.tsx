// context.tsx

import { createContext, useContext } from "solid-js";
import { AuthSession } from "@supabase/supabase-js";

export type Role = "user" | "enterprise";

export interface GlobalContextData {
    session: AuthSession | "loading";
    edit: boolean;
    role: Role;
}

export const globalContextData: GlobalContextData = {
    session: "loading",
    edit: false,
    role: "user" //enterprise ou user
};

export const GlobalContext = createContext<GlobalContextData>(globalContextData);

export function useGlobalContext() {
    return useContext(GlobalContext);
}