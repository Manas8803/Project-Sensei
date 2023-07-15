import Searchbar from "./Searchbar";
import TaskList from "./TaskList";
import classes from "./Main.module.css";
const Main = () => {
	return (
		<div className={classes.bg}>
			<Searchbar></Searchbar>
			<div className={classes.subgen}>
				<TaskList class title="Todo" name="incomplete" id={1} />
				<TaskList title="In Progress" name="inprogress" id={2} />
				<TaskList title="In Review" name="inreview" id={3} />
				<TaskList title="Done" name="completed" id={4} />
			</div>
		</div>
	);
};
export default Main;
