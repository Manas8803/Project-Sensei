import React, { useEffect, useState } from "react";
import { createContext } from "react";
import ResponsiveAppBar from "./Navbar";
import axios from "axios";
import Main from "./Main/Main";
import classes from "./LandingPage.module.css";
import ProjectBar from "./SideBar/ProjectBar";

export const DataContext = createContext();

const LandingPage = () => {
	const [projectData, setProjectData] = useState({
		name: "",
		description: "",
	});

	const [taskData, setTaskData] = useState({
		name: "",
		description: "",
		taskStatus: "",
	});

	const [p_id, setP_id] = useState(undefined);

	const [allp_Data, setAllp_Data] = useState([]);
	const [allt_Data, setAllt_Data] = useState([]);

	const p_HandleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		//? Api Calls
		//&  1. Create project
		const header = {
			Authorization: `Bearer ${token}`,
		};
		try {
			await axios.post(
				"http://localhost:3000/user/login/projects/",
				projectData,
				{ headers: header }
			);
		} catch (error) {
			console.log(error);
		}

		//&  2. Get all projects
		try {
			const { data } = await axios.get(
				"http://localhost:3000/user/login/projects/",
				{ headers: header }
			);
			setAllp_Data(data.project);
		} catch (error) {
			console.log(error);
		}
	};

	const t_HandleSubmit = async (e) => {
		e.preventDefault();
		//? Api Calls
		//&  1. Create task
		const token = localStorage.getItem("token");
		const header = {
			Authorization: `Bearer ${token}`,
		};
		const { name } = taskData;
		console.log("In handle SubmitTask");
		console.log(name);
		if (!name) {
			alert("Please provide sufficient information to create a new task.")
			return;
		}
		if(!p_id){
			alert("Please select a project to create a new task.")
			return;
		}
		
		try {
			await axios.post(
				`http://localhost:3000/user/login/projects/tasks/${p_id}`,
				taskData,
				{ headers: header }
			);
		} catch (error) {
			console.log(error);
		}
		//&  2. Get all tasks
		try {
			const { data } = await axios.get(
				`http://localhost:3000/user/login/projects/tasks/${p_id}`,
				{ headers: header }
			);
			setAllt_Data(data.tasks);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		async function fetchProjects() {
			const token = localStorage.getItem("token");
			try {
				const header = {
					Authorization: `Bearer ${token}`,
				};
				const { data } = await axios.get(
					"http://localhost:3000/user/login/projects/",
					{ headers: header }
				);
				setAllp_Data(data.project);
			} catch (error) {
				console.log(error);
			}
		}
		fetchProjects();
	}, []);

	return (
		<DataContext.Provider
			value={{
				projectData,
				setProjectData,
				p_HandleSubmit,
				taskData,
				setTaskData,
				t_HandleSubmit,
				allp_Data, //* For project bar
				allt_Data,
				setAllt_Data,
				p_id,
				setP_id,
			}}
		>
			<ResponsiveAppBar onClickcreate />
			<div className={classes.gen}>
				<ProjectBar />
				<Main />
			</div>
		</DataContext.Provider>
	);
};
export default LandingPage;
