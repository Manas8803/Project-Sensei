import classes from "./CardP.module.css";
import React from "react";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

const CardP = (props) => {
	return (
		<div onClick={props.onClick}>
			<button
				type="button"
				className={props.selected ? `${classes.selected}` : `${classes.card}`}
				style={{ width: "100%", marginRight: "auto" }}
				onClick={props.onClick}
				id={props.id}
				key={props.id}
			>
				<h2 id={props.id}>{props.name}</h2>
				<div className={classes.btnContainer}>
					<ConfirmDeleteModal id={props.id} name="project" />
				</div>
			</button>
		</div>
	);
};
export default CardP;
