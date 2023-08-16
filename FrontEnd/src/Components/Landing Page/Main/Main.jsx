import Searchbar from "./Searchbar";
import TaskList from "./TaskList";
import classes from "./Main.module.css";
import { useState } from "react";
import { useAllTaskData, useLoading } from "../../../ContextProvider";
const Main = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { allt_Data } = useAllTaskData();
	const { taskLoader } = useLoading();

	const handleSearchChange = (newQuery) => {
		setSearchQuery(newQuery);
	};

	return (
		<div className={classes.bg}>
			<Searchbar onSearchChange={handleSearchChange}></Searchbar>
			{taskLoader ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "75%",
						fontSize: "2.5rem",
					}}
				>
					<h1>Loading Tasks...</h1>
				</div>
			) : allt_Data[0]?.name ? (
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
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "75%",
						color: "#D8A31A",
						fontSize: "2.5rem",
					}}
				>
					<h1>No Tasks Found..</h1>
				</div>
			)}
		</div>
	);
};
export default Main;
