import classes from "./CardP.module.css";
import React from "react";

const CardP = (props) => {
	return (
		<button
			className={props.selected ? classes.selected : classes.card}
			onClick={props.onClick}
			id={props.id}
		>
			<h2 className={classes.alingnment} id={props.id}>
				{props.name}
			</h2>
		</button>
	);
};
export default CardP;
