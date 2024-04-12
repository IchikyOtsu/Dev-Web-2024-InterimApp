import { createEffect, createSignal } from "solid-js";
import { useGlobalContext } from "../context.tsx";
import styles from "./NotificationsPage.module.css";

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
        <div class={styles.notificationsPageContainer}>
            <h2>Notifications</h2>
            {user ? (
                <ul>
                    {notifications().map((notification) => (
                        <li key={notification.id}>
                            {notification.content}
                            <span class={styles.notificationDate}>{new Date(notification.created_at).toLocaleString()}</span>
                        </li>
                        ))}
                </ul>
                ) : (
                    <p>Veuillez vous connecter pour voir vos notifications.</p>
                    )}
        </div>
        );
};

export default NotificationsPage;