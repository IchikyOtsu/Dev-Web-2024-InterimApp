import { Button } from "@jundao/design";
import { createEffect, createSignal } from "solid-js";
// import 'index.css';

const ModifyAdvert = (props) => {
	const { title, description, location, id, start_date, end_date, salary } = props;



	return (
		<>
		<div>
			<h4>
				Ici tu peux modifier les valeurs de la page
			</h4>
			<br></br>
			<div>
				<div>
					<label> Title </label>
					<input type="text" placeholder={title} />
				</div>
				<div>
					<label> Description </label>
					<textarea placeholder={description} />
				</div>
				<div>
					<label> Location: </label>
					<input type="text" placeholder={location} />
				</div>
				<div>
					<label> Start Date: </label>
					({start_date}) <input type="date" placeholder={start_date} />
				</div>
				<div>
					<label> End Date: </label>
					({end_date}) <input type="date" placeholder={end_date} />
				</div>
				<div>
					<label> Salary: </label>
					<input type="number" placeholder={salary} />
				</div>
			</div>

			<Button >
				Submit
			</Button>
			<Button >
				Back
			</Button>
		</div>
		</>
	);
};

export default ModifyAdvert;
