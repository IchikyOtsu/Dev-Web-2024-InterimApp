import { createEffect, createSignal } from "solid-js";
import NotificationCard from "../../Components/Notifs";
import { useGlobalContext } from "../../context.tsx";
import "./NotificationsPage.css";

const NotificationsPage = () => {
	const { user } = useGlobalContext();
	const [notifications, setNotifications] = createSignal([]);

	const fetchNotifications = async () => {
		try {
			const response = await fetch(`/api/notifications?user_id=${user.id}`);
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
			<h2>Notifications</h2>
			{user ? (
				<div class="notificationsList">
					{notifications().map((notification) => (
						<NotificationCard
							key={notification.id}
							content={notification.content}
							createdAt={notification.created_at}
						/>
					))}
				</div>
			) : (
				<p>Veuillez vous connecter pour voir vos notifications.</p>
			)}
		</div>
	);
};

export default NotificationsPage;
