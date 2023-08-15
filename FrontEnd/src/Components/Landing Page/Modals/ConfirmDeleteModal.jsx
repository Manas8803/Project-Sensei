import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import classes from "./TaskModal.module.css";
import {
	useAllProjectData,
	useAllTaskData,
	usePID,
} from "../../../ContextProvider";
import logo from "../../../assets/delete-button-svgrepo-com.svg";

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

export default function ConfirmDeleteModal(props) {
	const { getAllProjects, deleteProject } = useAllProjectData();
	const { p_id } = usePID();
	const { setAllt_Data, deleteTask, getAllTasks } = useAllTaskData();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = (e) => {
		setOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (props.name === "project") {
			//& Delete project :
			await deleteProject(props.id);

			//& Get All Projects :
			await getAllProjects();

			//& Set All Task :
			if (p_id === props.id) {
				setAllt_Data([]);
			}
		} else if (props.name === "task") {
			//& Delete task :
			await deleteTask(props.id);

			//& Get All tasks :
			await getAllTasks();
		}
		handleClose(e);
	};

	return (
		<>
			<img src={logo} onClick={handleOpen} className={classes.imgEdit} />
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
						<p>Are you sure you want to delete this {props.name} ??</p>
						<button className={classes.buttonT} onClick={handleClose}>
							Cancel
						</button>
						<button
							className={classes.buttonT}
							onClick={handleSubmit}
							style={{ backgroundColor: "#ED5E68" }}
						>
							Delete
						</button>
					</Box>
				</Fade>
			</Modal>
		</>
	);
}
