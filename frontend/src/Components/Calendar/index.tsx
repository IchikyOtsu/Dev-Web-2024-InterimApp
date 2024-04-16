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
			<div class={"calendarContainer"}>
				<div class={"calendarHeader"}>
					<button
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
					</button>
					<span>
						{currentDate().toLocaleString("default", {
							month: "long",
							year: "numeric",
						})}
					</span>
					<button
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
					</button>
				</div>
				<div class={"calendarBody"}>
					<div class={"weekDays"}>
						<span>Sun</span>
						<span>Mon</span>
						<span>Tue</span>
						<span>Wed</span>
						<span>Thu</span>
						<span>Fri</span>
						<span>Sat</span>
					</div>
					<div class={"daysGrid"}>
						<For each={blankDays}>
							{() => <div class={"blankDay"}>&nbsp;</div>}
						</For>
						<For each={daysInMonth}>
							{(day) => (
								<div class={"day"}>
									<span>{day}</span>
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
										{(event) => <div class={"event"}>{event.title}</div>}
									</For>
								</div>
							)}
						</For>
					</div>
				</div>
			</div>
		);
	};

	return renderCalendar();
};

export default Calendar;
