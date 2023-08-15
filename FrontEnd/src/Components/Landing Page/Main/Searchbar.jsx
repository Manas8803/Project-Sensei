import classes from "./Searchbar.module.css";
import TaskModal from "../Modals/TaskModal";
import { useState } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className={classes.searchbar}>
        <div className={classes.searchContainer}>
          <input
            type="text"
            className={classes.searchInput}
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div className={classes.taskbtn} style={{ maxHeight: "2.6rem" }}>
          <TaskModal></TaskModal>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
