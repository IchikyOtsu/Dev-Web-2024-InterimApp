import type { Component } from "solid-js";
import "./index.css";

interface NotificationCardProps {
	content: string;
	createdAt: string;
}

const NotificationCard: Component<NotificationCardProps> = (props) => {
	return (
		<div class="notificationCard">
			<div class="notificationContent">{props.content}</div>
			<div class="notificationDate">
				{new Date(props.createdAt).toLocaleString()}
			</div>
		</div>
	);
};

export default NotificationCard;
