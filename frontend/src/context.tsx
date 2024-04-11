// context.tsx

import { createContext, useContext, Signal, createSignal } from "solid-js";
import { AuthSession } from "@supabase/supabase-js";

export type Role = "user" | "enterprise";

export interface GlobalContextData {
    session: Signal<AuthSession | "loading">;
    edit: Signal<boolean>;
    role: Signal<Role>;
}

export const GlobalContext = createContext<GlobalContextData>({
    session: createSignal<AuthSession | "loading">("loading"),
    edit: createSignal<boolean>(false),
    role: createSignal<Role>(GlobalContext.role())
});

export function useGlobalContext() {
    const context = useContext(GlobalContext);

    if (context === undefined) {
        throw new Error(
            "`useGlobalContext` must be used within the inside `root` children"
            );
    }

    return context;
}

// Hardcoder le rôle de l'utilisateur ici
export const defaultUserRole: Role = "user";