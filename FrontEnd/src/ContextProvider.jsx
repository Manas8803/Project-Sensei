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

//* Token Retrieval :
const token = localStorage.getItem("token");
const header = {
	Authorization: `Bearer ${token}`,
};

export default function ContextProvider({ children }) {
	//* All project/task state :
	const [allp_Data, setAllp_Data] = useState([]);
	const [allt_Data, setAllt_Data] = useState([]);

	//* Project/Task form state :
	const [projectData, setProjectData] = useState({
		name: "",
		description: "",
		_id: "",
	});

	const [taskData, setTaskData] = useState({
		name: "",
		description: "",
		taskStatus: "",
		_id: "",
	});

	//* PID state :
	const [p_id, setP_id] = useState(undefined);

	//* For Projects :
	const getAllProjects = async () => {
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

	const createProject = async () => {
		try {
			await axios.post(
				"http://localhost:3000/user/login/projects/",
				projectData,
				{ headers: header }
			);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProject = async (id) => {
		try {
			await axios.delete(`http://localhost:3000/user/login/projects/${id}`, {
				headers: header,
			});
		} catch (error) {
			console.log(error);
		}
	};

	//* For Tasks :
	const getAllTasks = async () => {
		try {
			const { data } = await axios.get(
				`http://localhost:3000/user/login/projects/${p_id}/tasks/`,
				{ headers: header }
			);
			setAllt_Data(data.tasks);
		} catch (error) {
			console.log(error);
		}
	};

	const createTask = async () => {
		const { name } = taskData;
		if (!name) {
			alert("Please provide sufficient information to create a new task.");
			return;
		}
		if (!p_id) {
			alert("Please select a project to create a new task.");
			return;
		}
		console.log(p_id);

		try {
			await axios.post(
				`http://localhost:3000/user/login/projects/${p_id}/tasks/`,
				taskData,
				{ headers: header }
			);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async (t_id) => {
		try {
			await axios.delete(
				`http://localhost:3000/user/login/projects/${p_id}/tasks/${t_id}`,
				{ headers: header }
			);
		} catch (error) {
			console.log(error);
		}
	};

	//^ For Modals :
	const p_HandleSubmit = async (e) => {
		e.preventDefault();

		//? Api Calls
		//&  1. Create project
		await createProject();
		//&  2. Get all projects
		getAllProjects();
	};

	const t_HandleSubmit = async (e) => {
		e.preventDefault();
		//? Api Calls
		//&  1. Create task
		await createTask();
		//&  2. Get all tasks
		getAllTasks();
	};

	useEffect(() => {
		async function fetchProjects() {
			await getAllProjects();
		}
		fetchProjects();
	}, []);

	return (
		<>
			<AllProjectContext.Provider
				value={{ allp_Data, setAllp_Data, getAllProjects, deleteProject }}
			>
				<AllTaskContext.Provider
					value={{ allt_Data, setAllt_Data, getAllTasks, deleteTask }}
				>
					<ProjectFormContext.Provider
						value={{
							projectData,
							setProjectData,
							p_HandleSubmit,
							createProject,
						}}
					>
						<TaskFormContext.Provider
							value={{
								taskData,
								setTaskData,
								t_HandleSubmit,
								createTask,
							}}
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
