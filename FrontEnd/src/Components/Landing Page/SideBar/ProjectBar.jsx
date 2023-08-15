import CardP from "../Card/CardP";
import classes from "./ProjectBar.module.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import {
	useAllProjectData,
	useAllTaskData,
	usePID,
} from "../../../ContextProvider";

const ProjectBar = () => {
	const { allp_Data, getAllProjects } = useAllProjectData();
	const { setAllt_Data, getAlltasks } = useAllTaskData();
	const { setP_id } = usePID();

	const [selectedItem, setSelectedItem] = useState(null);

	async function handleClick(e, index) {
		const { id } = e.target;
		setSelectedItem(index);
		setP_id(id);
		const token = localStorage.getItem("token");
		const header = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const { data } = await axios.get(
				`http://localhost:3000/user/login/projects/${id}/tasks`,
				{ headers: header }
			);
			setAllt_Data(data.tasks);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={classes.container}>
			<div className={classes.bg}>
				<h1 className={classes.colName}>Project List</h1>
			</div>
			{allp_Data.map((p_data, index) => {
				return (
					<CardP
						name={p_data.name}
						onClick={(e) => handleClick(e, index)}
						selected={selectedItem === index}
						id={p_data._id}
					/>
				);
			})}
		</div>
	);
};
export default ProjectBar;
