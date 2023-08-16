import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import classes from "./TaskModal.module.css";
import { useAllTaskData } from "../../../ContextProvider";
import logo from "../../../assets/edit-button-svgrepo-com.svg";
import { useState } from "react";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 350,
	borderRadius: "10px",
	border: "2px solid #1876D0",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export default function EditTModal(props) {
	const { updateTask, getAllTasks } = useAllTaskData();
	const [e_taskData, setE_TaskData] = useState(props);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = (e) => {
		setOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//& Edit Task :
		await updateTask(props.id, e_taskData);
		//& Get All Tasks :
		await getAllTasks();
		handleClose(e);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setE_TaskData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<>
			<img className={classes.imgEdit} onClick={handleOpen} src={logo} />
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
									value={e_taskData.name}
									onChange={handleChange}
									required
								/>
							</div>
							<label htmlFor="progress-selection">Choose Progress</label>

							<select
								className={classes.selectT}
								name="taskStatus"
								id="pet-select"
								value={e_taskData.taskStatus}
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
									value={e_taskData.description}
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
