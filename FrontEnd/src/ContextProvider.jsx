import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import React from "react";

export const AllProjectContext = createContext();
export const AllTaskContext = createContext();
export const ProjectFormContext = createContext();
export const TaskFormContext = createContext();
export const PIDContext = createContext();
export const IsAuthenticatedContext = createContext();

export function useAllProjectData() {
	return useContext(AllProjectContext);
}

export function useAllTaskData() {
	return useContext(AllTaskContext);
}

export function useProjectFormData() {
	return useContext(ProjectFormContext);
}

export function useTaskFormData() {
	return useContext(TaskFormContext);
}

export function usePID() {
	return useContext(PIDContext);
}

export default function ContextProvider({ children }) {
	//* All project/task state :
	const [allp_Data, setAllp_Data] = useState([]);
	const [allt_Data, setAllt_Data] = useState([]);

	//* Project/Task form state :
	const [projectData, setProjectData] = useState({
		name: "",
		description: "",
	});

	const [taskData, setTaskData] = useState({
		name: "",
		description: "",
		taskStatus: "",
	});

	//* PID state :
	const [p_id, setP_id] = useState(undefined);

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
			alert("Please provide sufficient information to create a new task.");
			return;
		}
		if (!p_id) {
			alert("Please select a project to create a new task.");
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
		<>
			<AllProjectContext.Provider value={{ allp_Data, setAllp_Data }}>
				<AllTaskContext.Provider value={{ allt_Data, setAllt_Data }}>
					<ProjectFormContext.Provider
						value={{ projectData, setProjectData, p_HandleSubmit }}
					>
						<TaskFormContext.Provider
							value={{ taskData, setTaskData, t_HandleSubmit }}
						>
							<PIDContext.Provider value={{ p_id, setP_id }}>
								{children}
							</PIDContext.Provider>
						</TaskFormContext.Provider>
					</ProjectFormContext.Provider>
				</AllTaskContext.Provider>
			</AllProjectContext.Provider>
		</>
	);
}

ContextProvider.propTypes = {};
