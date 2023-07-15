import classes from "./TaskList.module.css";
import { useContext } from "react";
import { DataContext } from "../LandingPage";
import Card from "../Card/Card";

const TaskList = (props) => {
	const { allt_Data } = useContext(DataContext);
	const cardT = allt_Data.map((task) => {
		if (task.taskStatus == props.name) {
			return (
				<Card name={task.name} description={task.description} id={task.id} />
			);
		}
	});

	return (
		<>
			<div className={classes.container}>
				<div className={classes.title}>
					<h2>{props.title}</h2>
				</div>
				{cardT}
			</div>
		</>
	);
};
export default TaskList;
