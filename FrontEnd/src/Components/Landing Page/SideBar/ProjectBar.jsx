import CardP from "../Card/CardP";
import classes from "./ProjectBar.module.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
	useAllProjectData,
	useAllTaskData,
	useLoading,
	usePID,
} from "../../../ContextProvider";

const ProjectBar = () => {
	const { allp_Data, getAllProjects } = useAllProjectData();
	const { projectLoader, setProjectLoader, setTaskLoader } = useLoading();
	const { getAllTasks } = useAllTaskData();
	const { setP_id } = usePID();

	const [selectedItem, setSelectedItem] = useState(null);
	useEffect(() => {
		async function fetchProjects() {
			setProjectLoader(true);
			await getAllProjects();
			setProjectLoader(false);
		}
		fetchProjects();
	}, []);

	async function handleClick(event, index) {
		const { id } = event.target;
		if (!id) return;
		setP_id(id);
		setSelectedItem(index);
		setTaskLoader(true);
		await getAllTasks(id);
		setTaskLoader(false);
	}

	return (
		<div className={classes.container}>
			<div className={classes.bg}>
				<h1 className={classes.colName}>Project List</h1>
			</div>
			{projectLoader ? (
				<h2 style={{ textAlign: "center" }}>FETCHING PROJECTS..</h2>
			) : allp_Data[0]?.name ? (
				allp_Data.map((p_data, index) => {
					return (
						<CardP
							name={p_data.name}
							onClick={(e) => handleClick(e, index)}
							selected={selectedItem === index}
							id={p_data._id}
							key={p_data._id}
						/>
					);
				})
			) : (
				<h2 style={{ textAlign: "center" }}> No Projects </h2>
			)}
		</div>
	);
};
export default ProjectBar;
