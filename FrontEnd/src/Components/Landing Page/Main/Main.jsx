import Searchbar from "./Searchbar";
import TaskList from "./TaskList";
import classes from "./Main.module.css";
const Main = () => {
  return (
    <div className={classes.bg}>
      <Searchbar></Searchbar>
      <div className={classes.subgen}>
        <TaskList class title="Todo" name="incomplete"/>
        <TaskList title="In Progress" name="inprogress"/>
        <TaskList title="In Review" name="inreview"/>
        <TaskList title="Done" name="completed"/>
      </div>
    </div>
  );
};
export default Main;
