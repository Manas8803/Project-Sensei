import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./Navbar";
import axios from "axios";
import Main from "./Main/Main";
import classes from "./LandingPage.module.css";
import ProjectBar from "./SideBar/ProjectBar";

export const DataContext = React.createContext();

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

	const [allp_Data, setAllp_Data] = useState([]);
	const [allt_Data, setAllt_Data] = useState([]);

	const p_HandleSubmit = async (e) => {
		e.preventDefault();
		// const token = localStorage.getItem("token");

		//? Api Calls
		//&  1. Create project
		const token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWVhZDEwMDhhOTFjMjFmZjZmYmUzZSIsIm5hbWUiOiJNYW5hcyBTYWhhIiwiaWF0IjoxNjg5MjcwMjg2LCJleHAiOjE2OTE4NjIyODZ9.6L1L7--vcUdcrRz6GTVcGNdYUba3DQTBqNU9-Dn59Fw";
		const header = {
			Authorization: `Bearer ${token}`,
		};
		try {
			const { data } = await axios.post(
				"http://localhost:3000/user/login/projects/",
				projectData,
				{ headers: header }
			);
			setAllp_Data(data.project);
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
		console.log("Task Handle Submit");
		//? Api Calls
		//&  1. Create task
		//&  2. Get all tasks
	};

	useEffect(() => {
		async function fetchProjects() {
			//* Project :
			const token =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWVhZDEwMDhhOTFjMjFmZjZmYmUzZSIsIm5hbWUiOiJNYW5hcyBTYWhhIiwiaWF0IjoxNjg5MjcwMjg2LCJleHAiOjE2OTE4NjIyODZ9.6L1L7--vcUdcrRz6GTVcGNdYUba3DQTBqNU9-Dn59Fw";
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

	// useEffect(async () => {
	// 	const token = localStorage.getItem("token");
	// 	const header = {
	// 		Authorization: `Bearer ${token}`,
	// 	};
	// 	const { data } = await axios.get("localhost:3000/user/projects/", {
	// 		headers: header,
	// 	});
	// setAllp_Data(data.project);
	// })

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
