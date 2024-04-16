import { Text, Title } from "@jundao/design";
import { For, createEffect, createSignal } from "solid-js";
import NotificationCard from "../../Components/Notifs";
import { useGlobalContext } from "../../context.tsx";
import "./NotificationsPage.css";

const NotificationsPage = () => {
	const { user } = useGlobalContext();
	const [notifications, setNotifications] = createSignal([]);

	const fetchNotifications = async () => {
		try {
			const response = await fetch(`/api/notifications?user_id=${user?.id}`);
			const data = await response.json();
			setNotifications(data);
		} catch (error) {
			console.error("Error fetching notifications:", error);
		}
	};

	createEffect(() => {
		if (user) {
			fetchNotifications();
		}
	});

	return (
		<div class="notificationsPageContainer">
			<Title>Notifications</Title>
			{notifications().length > 0 ? (
				<For each={notifications()}>
					{(notification) => (
						<NotificationCard
							key={notification.id}
							content={notification.content}
							createdAt={notification.created_at}
						/>
					)}
				</For>
			) : (
				<Text>Pas de notifications</Text>
			)}
		</div>
	);
};

export default NotificationsPage;
