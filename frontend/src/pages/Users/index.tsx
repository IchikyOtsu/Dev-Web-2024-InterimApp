import {
	Button,
	Card,
	Modal,
	Space,
	Spinner,
	Text,
	Title,
} from "@jundao/design";
import { IoBusiness, IoPencil, IoPersonAdd } from "solid-icons/io";
import { For, createResource, createSignal } from "solid-js";
import AddUser from "../../Components/AddUser";
import "./index.css";
import AddBusiness from "../../Components/AddBusiness";
import type { User } from "../../context";

const UsersPage = () => {
	const [openAddUserModal, setOpenAddUserModal] = createSignal(false);
	const [openAddBusinessModal, setOpenAddBusinessModal] = createSignal(false);

	const [users, { refetch }] = createResource<Array<User> | undefined>(
		async () => {
			const result = await fetch("/api/users");
			if (result.status !== 200) return undefined;
			return result.json() as Promise<Array<User>>;
		},
	);

	return (
		<Space vertical class="usersPageContainer">
			<Space size="large" align="center" wrap>
				<Title>Utilisateurs</Title>
				<Button type="primary" onClick={() => setOpenAddUserModal(true)}>
					<Space align="center">
						<IoPersonAdd />
						Ajouter un utilisateur
					</Space>
				</Button>
				<Button onClick={() => setOpenAddBusinessModal(true)}>
					<Space align="center">
						<IoBusiness />
						Ajouter une entreprise
					</Space>
				</Button>
			</Space>

			<Space vertical size="medium">
				<Card class="userCard">
					<Text bold style={{ width: "33%" }}>
						Full Name
					</Text>
					<Text bold style={{ width: "43%" }}>
						Email
					</Text>
					<Text bold style={{ width: "26%" }}>
						Role
					</Text>
					<Text bold>Edit</Text>
				</Card>
				<Space vertical class="usersContainer">
					<For each={users()} fallback={<Spinner />}>
						{(user: User) => (
							<Card class="userCard">
								<Text style={{ width: "33%" }}>
									{`${user.first_name !== "" ? user.first_name : "?"}
									${user.last_name !== "" ? user.last_name : "?"}`}
								</Text>
								<Text style={{ width: "43%" }}>{user.email}</Text>
								<Text style={{ width: "26%" }}>{user.role}</Text>
								<Button>
									<IoPencil />
								</Button>
							</Card>
						)}
					</For>
				</Space>
			</Space>

			<Modal
				open={openAddUserModal()}
				onOpenChange={setOpenAddUserModal}
				title="Nouvel Utilisateur"
			>
				<AddUser />
			</Modal>

			<Modal
				open={openAddBusinessModal()}
				onOpenChange={setOpenAddBusinessModal}
				title="Nouvelle Entreprise"
			>
				<AddBusiness />
			</Modal>
		</Space>
	);
};

export default UsersPage;
