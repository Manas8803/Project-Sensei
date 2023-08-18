import { createContext, useContext } from "react";
import { useState } from "react";
import axios from "axios";
import React from "react";

export const AllProjectContext = createContext();
export const AllTaskContext = createContext();
export const IsAuthenticatedContext = createContext();
export const PIDContext = createContext();
export const LoadingContext = createContext();

export function useAllProjectData() {
	return useContext(AllProjectContext);
}

export function useAllTaskData() {
	return useContext(AllTaskContext);
}

export function useProjectFormData() {
	return useContext(ProjectFormContext);
}

export function usePID() {
	return useContext(PIDContext);
}

export function useLoading() {
	return useContext(LoadingContext);
}

export default function ContextProvider({ children }) {
	//* Token Retrieval :
	const token = localStorage.getItem("token");
	const header = {
		Authorization: `Bearer ${token}`,
	};

	//* Loader :
	const [projectLoader, setProjectLoader] = useState(false);
	const [taskLoader, setTaskLoader] = useState(false);

	//* All project/task state :
	const [allp_Data, setAllp_Data] = useState([]);
	const [allt_Data, setAllt_Data] = useState([]);

	//* PID state :
	const [p_id, setP_id] = useState(undefined);

	//* For Projects :
	const getAllProjects = async () => {
		try {
			const { data } = await axios.get(
				"https://project-sensei.onrender.com/user/login/projects/",
				{ headers: header }
			);
			setAllp_Data(data.project);
		} catch (error) {
			console.log(error);
		}
	};

	const createProject = async (projectData) => {
		const { name } = projectData;
		if (!name) alert("Please provide with a name for the project.");
		try {
			const { data } = await axios.post(
				"https://project-sensei.onrender.com/user/login/projects/",
				projectData,
				{ headers: header }
			);
			setAllp_Data((prev) => [...prev, data.project]);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProject = async (id) => {
		setAllp_Data(allp_Data.filter((project) => project._id !== id));
		try {
			await axios.delete(
				`https://project-sensei.onrender.com/user/login/projects/${id}`,
				{
					headers: header,
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	//* For Tasks :
	const getAllTasks = async (p_id) => {
		try {
			const { data } = await axios.get(
				`https://project-sensei.onrender.com/user/login/projects/${p_id}/tasks/`,
				{ headers: header }
			);
			setAllt_Data(data.tasks);
		} catch (error) {
			console.log(error);
		}
	};

	const createTask = async (taskData) => {
		const { name } = taskData;
		if (!name) {
			alert("Please provide sufficient information to create a new task.");
			return;
		}
		if (!p_id) {
			alert("Please select a project to create a new task.");
			return;
		}

		try {
			const { data } = await axios.post(
				`https://project-sensei.onrender.com/user/login/projects/${p_id}/tasks/`,
				taskData,
				{ headers: header }
			);
			setAllt_Data((prev) => [...prev, data.task]);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async (t_id) => {
		setAllt_Data(allt_Data.filter((task) => task._id !== t_id));
		try {
			await axios.delete(
				`https://project-sensei.onrender.com/user/login/projects/${p_id}/tasks/${t_id}`,
				{ headers: header }
			);
		} catch (error) {
			console.log(error);
		}
	};

	const updateTask = async (t_id, props) => {
		setAllt_Data(allt_Data.filter((task) => task._id !== t_id));
		setAllt_Data((prev) => [...prev, props]);
		try {
			await axios.patch(
				`https://project-sensei.onrender.com/user/login/projects/${p_id}/tasks/${t_id}`,
				props,
				{ headers: header }
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<AllProjectContext.Provider
				value={{
					allp_Data,
					setAllp_Data,
					getAllProjects,
					createProject,
					deleteProject,
				}}
			>
				<AllTaskContext.Provider
					value={{
						allt_Data,
						setAllt_Data,
						createTask,
						getAllTasks,
						deleteTask,
						updateTask,
					}}
				>
					<PIDContext.Provider value={{ p_id, setP_id }}>
						<LoadingContext.Provider
							value={{
								projectLoader,
								setProjectLoader,
								taskLoader,
								setTaskLoader,
							}}
						>
							{children}
						</LoadingContext.Provider>
					</PIDContext.Provider>
				</AllTaskContext.Provider>
			</AllProjectContext.Provider>
		</>
	);
}

ContextProvider.propTypes = {};
