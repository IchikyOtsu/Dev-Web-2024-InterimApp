import { Card } from "@jundao/design";
import type { Component } from "solid-js";
import "./index.css";

interface NotificationCardProps {
	content: string;
	createdAt: string;
}

const NotificationCard: Component<NotificationCardProps> = (props) => {
	return (
		<>
			<Card title={props.content}>
				{new Date(props.createdAt).toLocaleString()}
			</Card>
			<br />
		</>
	);
};

export default NotificationCard;
