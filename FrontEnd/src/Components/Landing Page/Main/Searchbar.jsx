import classes from "./Searchbar.module.css";
import TaskModal from "../Modals/TaskModal";
import { useState } from "react";
import PropTypes from "prop-types";

const Searchbar = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearchChange(newQuery); 
  };

  return (
    <div className={classes.searchbar}>
      <div className={classes.searchContainer}>
        <input
          type="text"
          className={classes.searchInput}
          placeholder="Search"
          value={query} 
          onChange={handleSearchChange} 
        />
      </div>
      <div className={classes.taskbtn} style={{ maxHeight: "2.6rem" }}>
        <TaskModal />
      </div>
    </div>
  );
};
Searchbar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Searchbar;
