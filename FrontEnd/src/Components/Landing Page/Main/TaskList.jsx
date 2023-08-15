import classes from "./TaskList.module.css";
import Card from "../Card/Card";
import { useAllTaskData } from "../../../ContextProvider";

const TaskList = (props) => {
	const { allt_Data } = useAllTaskData();

	return (
		<div className={classes.container} key={props.id}>
			<div className={classes.title}>
				<h2>{props.title}</h2>
			</div>
			{allt_Data.map((task) => {
				if (
					task.taskStatus === props.name &&
					(task.name.toLowerCase().includes(props.query.toLowerCase()) ||
						task.description.toLowerCase().includes(props.query.toLowerCase()))
				) {
					return (
						<Card
							name={task.name}
							description={task.description}
							id={task._id}
						/>
					);
				}
			})}
		</div>
	);
};

export default TaskList;
