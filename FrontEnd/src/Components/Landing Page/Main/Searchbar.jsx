import classes from "./Searchbar.module.css";
import TaskModal from "../Modals/TaskModal";
import { useState } from "react";

const Searchbar = () => {
	const [searchText, setSearchText] = useState(undefined);
	return (
		<>
			<div className={classes.searchbar}>
				<div className={classes.searchContainer}>
					<input
						type="text"
						className={classes.searchInput}
						placeholder="Search"
					/>
				</div>
				<div className={classes.taskbtn} style={{ maxHeight: "2.6rem" }}>
					<TaskModal />
				</div>
			</div>
		</>
	);
};

export default Searchbar;
