import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { DataContext } from "../LandingPage";
import classes from "./TaskModal.module.css";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function TaskModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { taskData, setTaskData, t_HandleSubmit } = useContext(DataContext);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setTaskData((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log(taskData);
	};

	return (
		<>
			<Button onClick={handleOpen} sx={{ backgroundColor: "white" }}>
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
								/>
							</div>
							<label htmlFor="progress-selection">Choose Progress</label>

							<select
								className={classes.selectT}
								name="pets"
								id="pet-select"
								value={taskData.value}
								onChange={handleChange}
							>
								<option value="">--Please choose an option--</option>
								<option value="complete">Complete</option>
								<option value="incomplete">Incomplete</option>
								<option value="inprogress">In Progress</option>
								<option value="done">Done</option>
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
						<button className={classes.buttonT} onClick={handleClose}>
							Cancel
						</button>
						<button className={classes.buttonT}>Submit</button>
					</Box>
				</Fade>
			</Modal>
		</>
	);
}
