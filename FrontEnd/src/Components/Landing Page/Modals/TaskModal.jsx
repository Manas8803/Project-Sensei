import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import classes from "./TaskModal.module.css";
import { useAllTaskData } from "../../../ContextProvider";
import { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	borderRadius: "10px",
	border: "2px solid #3A9D96",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export default function TaskModal() {
	const [taskData, setTaskData] = useState({
		name: "",
		description: "",
		taskStatus: "",
		_id: "",
	});

	const { createTask } = useAllTaskData();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (e) => {
		const { name, taskStatus } = taskData;
		if (!name) return alert("Please enter a name for the task");
		if (!taskStatus)
			return alert("Please define a status of completion for this task");
		await createTask(taskData);
		handleClose(e);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setTaskData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<>
			<Button
				onClick={handleOpen}
				sx={{ backgroundColor: "white", color: "#3A9D96" }}
			>
				Add Task
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<form className={classes.formT} action="">
							<div>
								<label className={classes.labelT} htmlFor="">
									Name
								</label>
								<input
									className={classes.inputT}
									type="text"
									name="name"
									value={taskData.name}
									onChange={handleChange}
									required
								/>
							</div>
							<label htmlFor="progress-selection">Choose Progress</label>

							<select
								className={classes.selectT}
								name="taskStatus"
								id="pet-select"
								value={taskData.taskStatus}
								onChange={handleChange}
								required
							>
								<option value="">--Please choose an option--</option>
								<option value="incomplete">Incomplete</option>
								<option value="inprogress">In Progress</option>
								<option value="inreview">In Review</option>
								<option value="completed">Done</option>
							</select>
							<div>
								<label className={classes.labelT} htmlFor="">
									Description
								</label>
								<textarea
									className={classes.textareaT}
									type="text"
									name="description"
									value={taskData.description}
									onChange={handleChange}
									id="description"
								/>
							</div>
						</form>
						<button
							className={`${classes.buttonT} ${classes.buttonC}`}
							onClick={handleClose}
						>
							Cancel
						</button>
						<button
							className={`${classes.buttonT} ${classes.buttonP}`}
							onClick={handleSubmit}
						>
							Submit
						</button>
					</Box>
				</Fade>
			</Modal>
		</>
	);
}
