import CardP from "../Card/CardP";
import classes from "./ProjectBar.module.css";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../LandingPage";
import axios from "axios";
import { nanoid } from "nanoid";

const ProjectBar = () => {
	const { allp_Data, setAllt_Data, setP_id } = useContext(DataContext);

	let cardsP = allp_Data.map((p_data) => {
		return (
			<CardP name={p_data.name} handleClick={handleClick} id={p_data._id} />
		);
	});

	async function handleClick(e) {
		const { id } = e.target;
		setP_id(id);

		const token = localStorage.getItem("token");
		const header = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const { data } = await axios.get(
				`http://localhost:3000/user/login/projects/tasks/${id}`,
				{ headers: header }
			);
			setAllt_Data(data.tasks);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={classes.container} key={nanoid()}>
			<div className={classes.bg}>
				<h1 className={classes.colName}>Project List</h1>
			</div>
			{cardsP}
		</div>
	);
};
export default ProjectBar;
