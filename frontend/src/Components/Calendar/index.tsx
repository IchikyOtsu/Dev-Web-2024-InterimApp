import { Button, Card, Text } from "@jundao/design";
// Calendar.tsx
import { For, createSignal } from "solid-js";
import "./Calendar.css";

const Calendar = (props) => {
	const [currentDate, setCurrentDate] = createSignal(new Date());

	const renderCalendar = () => {
		const firstDayOfMonth = new Date(
			currentDate().getFullYear(),
			currentDate().getMonth(),
			1,
		).getDay();
		const lastDateOfMonth = new Date(
			currentDate().getFullYear(),
			currentDate().getMonth() + 1,
			0,
		).getDate();

		const daysInMonth = Array.from(
			{ length: lastDateOfMonth },
			(_, i) => i + 1,
		);
		const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

		return (
			<Card
				class={"calendarContainer"}
				title={
					<div class={"calendarHeader"}>
						<Button
							onClick={() =>
								setCurrentDate(
									new Date(
										currentDate().getFullYear(),
										currentDate().getMonth() - 1,
										1,
									),
								)
							}
						>
							&lt;
						</Button>
						<Text>
							{currentDate().toLocaleString("default", {
								month: "long",
								year: "numeric",
							})}
						</Text>
						<Button
							onClick={() =>
								setCurrentDate(
									new Date(
										currentDate().getFullYear(),
										currentDate().getMonth() + 1,
										1,
									),
								)
							}
						>
							&gt;
						</Button>
					</div>
				}
			>
				<div class={"calendarBody"}>
					<div class={"weekDays"}>
						<Text>Sun</Text>
						<Text>Mon</Text>
						<Text>Tue</Text>
						<Text>Wed</Text>
						<Text>Thu</Text>
						<Text>Fri</Text>
						<Text>Sat</Text>
					</div>
					<div class={"daysGrid"}>
						<For each={blankDays}>
							{() => <div class={"blankDay"}>&nbsp;</div>}
						</For>
						<For each={daysInMonth}>
							{(day) => (
								<div class={"day"}>
									<Text>{day}</Text>
									<For
										each={props.events.filter((event) => {
											const eventStart = new Date(event.start);
											const eventEnd = new Date(event.end);
											const eventDate = new Date(
												currentDate().getFullYear(),
												currentDate().getMonth(),
												day,
											);
											return eventStart <= eventDate && eventEnd >= eventDate;
										})}
									>
										{(event) => (
											<div class="event">
												<Text style={{ color: "white" }}>{event.title}</Text>
											</div>
										)}
									</For>
								</div>
							)}
						</For>
					</div>
				</div>
			</Card>
		);
	};

	return renderCalendar();
};

export default Calendar;
