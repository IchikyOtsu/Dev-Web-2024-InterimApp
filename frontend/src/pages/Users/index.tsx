import { Button, Card, Modal, Space, Text, Title } from "@jundao/design";
import { For, createSignal, onMount } from "solid-js";
import AddUser from "../../Components/AddUsers";
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
		<div class="pageContainer">
			<Space size="large" align="center">
				<Title>Utilisateurs</Title>
				<Button type="primary" onClick={() => setOpenModal(true)}>
					+ Ajouter un utilisateur
				</Button>
			</Space>

			<Space vertical size="medium">
				<Card class="userCard">
					<Text bold style={{ width: "33%" }}>
						Username
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
								<Text style={{ width: "33%" }}>{user.username}</Text>
								<Text style={{ width: "43%" }}>{user.email}</Text>
								<Text style={{ width: "23%" }}>{user.role}</Text>
								<Button>edit</Button>
							</Card>
						)}
					</For>
				</Space>
			</Space>

			<Modal open={openModal()} onOpenChange={setOpenModal}>
				<AddUser />
			</Modal>
		</div>
	);
};

export default UsersPage;
