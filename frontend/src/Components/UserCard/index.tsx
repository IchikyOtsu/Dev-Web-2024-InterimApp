import { createSignal } from "solid-js";
import { User } from "../../context.tsx";
import { Card, Text, Button, Modal, Input, Space } from "@jundao/design";
import { IoPencil } from "solid-icons/io";

export function UserCard(props: {user: User, refetch: Function}) {
    const refetch = props.refetch;
    const user = props.user;
    
    const [openEditUserModal, setOpenEditUserModal] = createSignal(false);
    const [openDeleteUserModal, setOpenDeleteUserModal] = createSignal(false);
    
    const [error, setError] = createSignal<string>();
    const [success, setSuccess] = createSignal<string>();
    
    const deleteUser = async () => {
        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }

            setSuccess("user deleted successfully");
            refetch();
        } catch (error) {
            setError(`Error deleting user: ${error.message}`);
        }
    };
    
    return(
        <Card class="userCard">
            <Text style={{ width: "33%" }}>
                {`${user.first_name !== "" ? user.first_name : "?"}
                ${user.last_name !== "" ? user.last_name : "?"}`}
            </Text>
            <Text style={{ width: "43%" }}>{user.email}</Text>
            <Text style={{ width: "26%" }}>{user.role}</Text>
            <Button onClick={() => setOpenEditUserModal(true)}>
                <IoPencil />
            </Button>

            <Modal
                open={openEditUserModal()}
                onOpenChange={setOpenEditUserModal}
                title="Modifier Utilisateur"
                footer={
                    <Space>
                        <Button type="primary" onClick={() => refetch()}> Modifier </Button>
                        <Button type="primary" danger onClick={() => setOpenDeleteUserModal(true)}> Supprimer l'utilisateur </Button>
                    </Space>
                }
            >
                <Space vertical>
                    <Input label="Prenom" value={user.first_name}/>
                    <Input label="Nom" value={user.last_name}/>
                    <Input label="Email" value={user.email}/>
                </Space>
            </Modal>
            
            <Modal
                open={openDeleteUserModal()}
                onOpenChange={setOpenDeleteUserModal}
                title="Supprimer Utilisateur"
                footer={
                    <Space>
                        <Button type="secondary" onClick={() => setOpenDeleteUserModal(false)}> Non </Button>
                        <Button type="primary" danger onClick={deleteUser}> Oui </Button>
                    </Space>
                }
            >
                <Text>Etes-vous sur de vouloir supprimer cet utilisateur?</Text>
            </Modal>
        </Card>
    );
}