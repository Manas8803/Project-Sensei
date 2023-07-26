import classes from "./CardP.module.css";
import React from "react";

const CardP = (props) => {
	return (
		<button className={classes.card} onClick={props.handleClick} id={props.id}>
			<h2 className={classes.alingnment} id={props.id}>
				{props.name}
			</h2>
		</button>
	);
};
export default CardP;
