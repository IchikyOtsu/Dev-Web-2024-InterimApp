// context.tsx

import { createContext, useContext } from "solid-js";
import { AuthSession } from "@supabase/supabase-js";

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
  id: 3,
  username: "acme_inc",
  email: "contact@acme.com",
  role: "enterprise",
  enterprise_id: 1,
};

export const globalContextData: GlobalContextData = {
  session: "loading",
  edit: false,
  user: hardcodedUser,
};

export const GlobalContext = createContext<GlobalContextData>(globalContextData);

export function useGlobalContext() {
  return useContext(GlobalContext);
}