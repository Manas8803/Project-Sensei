import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import classes from "./ProjectModal.module.css";
import { useAllProjectData } from "../../../ContextProvider";
import { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 350,
	borderRadius: "10px",
	bgcolor: "background.paper",
	border: "2px solid #3A9D96",
	boxShadow: 24,
	p: 4,
};

export default function ProjectModal() {
	const [projectData, setProjectData] = useState({
		name: undefined,
		description: "",
		_id: "",
	});

	const { createProject } = useAllProjectData();
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = async () => {
		const { name } = projectData;
		if (!name) return alert("Please enter a name for the project");
		await createProject(projectData);
		setOpen(false);
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setProjectData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div>
			<Button
				sx={{
					color: "white",
					position: "absolute",
					top: "25%",
					left: "83%",
				}}
				className="modal-trigger"
				onClick={handleOpen}
			>
				New Project
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
						<form className={classes.formP} action="">
							<div>
								<label className={classes.labelP} htmlFor="">
									Name
								</label>
								<input
									className={classes.inputP}
									type="text"
									name="name"
									onChange={handleChange}
									value={projectData.name}
									required
								/>
							</div>
							<div>
								<label className={classes.labelP} htmlFor="">
									Description
								</label>
								<textarea
									className={classes.textareaP}
									type="text"
									name="description"
									onChange={handleChange}
									value={projectData.description}
									id="description_P"
								></textarea>
							</div>
						</form>
						<button
							className={`${classes.button} ${classes.buttonC}`}
							onClick={handleClose}
						>
							Cancel
						</button>
						<button
							className={`${classes.button} ${classes.buttonP}`}
							onClick={handleClose}
						>
							Submit
						</button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
