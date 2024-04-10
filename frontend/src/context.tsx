import { createContext, useContext, Signal } from "solid-js";
import { AuthSession } from "@supabase/supabase-js";

export type Role = "user" | "enterprise";

export interface GlobalContextData {
    session: Signal<AuthSession | "loading">;
    edit: Signal<boolean>;
    role: Signal<Role>;
}

export const GlobalContext = createContext<GlobalContextData>();

export function useGlobalContext() {
    const context = useContext(GlobalContext);

    if (context === undefined) {
        throw new Error(
            "`useGlobalContext` must be used within the inside `root` children"
        );
    }

    return context;
}

export function getUserRole(user: AuthSession["user"]): Role {
    if (user.email.endsWith("@enterprise.com")) {
        return "enterprise";
    } else {
        return "user";
    }
}