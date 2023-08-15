import Searchbar from "./Searchbar";
import TaskList from "./TaskList";
import classes from "./Main.module.css";
import { useState } from "react";
const Main = () => {
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
  };
  return (
    <div className={classes.bg}>
      <Searchbar onSearchChange={handleSearchChange}></Searchbar>
      <div className={classes.subgen}>
        <TaskList
          query={searchQuery}
          class
          title="Todo"
          name="incomplete"
          id={1}
        />
        <TaskList
          query={searchQuery}
          title="In Progress"
          name="inprogress"
          id={2}
        />
        <TaskList
          query={searchQuery}
          title="In Review"
          name="inreview"
          id={3}
        />
        <TaskList query={searchQuery} title="Done" name="completed" id={4} />
      </div>
    </div>
  );
};
export default Main;
