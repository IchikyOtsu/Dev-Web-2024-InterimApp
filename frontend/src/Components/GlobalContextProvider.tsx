import {
	type ComponentProps,
	type FlowComponent,
	createResource,
} from "solid-js";
import { GlobalContext, type User } from "../context";

export function GlobalContextProvider(props: ComponentProps<FlowComponent>) {
	const [user, { refetch }] = createResource<User | undefined>(async () => {
		const result = await fetch(`/api/user/self`);
		if (result.status !== 200) return undefined;
		return result.json() as Promise<User>;
	});

	return (
		<GlobalContext.Provider value={{ user, refetch }}>
			{props.children}
		</GlobalContext.Provider>
	);
}
