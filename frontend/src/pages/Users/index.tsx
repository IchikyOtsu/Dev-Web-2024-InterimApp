import { Button, Card, Modal, Space, Text, Title } from "@jundao/design";
import { IoPencil, IoPersonAdd } from "solid-icons/io";
import { For, createSignal, onMount } from "solid-js";
import AddUser from "../../Components/AddUser";
import "./index.css";

const UsersPage = () => {
	const [users, setUsers] = createSignal([]);
	const [openModal, setOpenModal] = createSignal(false);

	onMount(() => {
		fetch("/api/users")
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((err) => console.error("API call failed:", err));
	});

	return (
		<Space vertical class="pageContainer">
			<Space size="large" align="center">
				<Title>Utilisateurs</Title>
				<Button type="primary" onClick={() => setOpenModal(true)}>
					<Space align="center">
						<IoPersonAdd />
						Ajouter un utilisateur
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
					<For each={users()}>
						{(user) => (
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
				open={openModal()}
				onOpenChange={setOpenModal}
				title="Nouvel Utilisateur"
			>
				<AddUser />
			</Modal>
		</Space>
	);
};

export default UsersPage;
