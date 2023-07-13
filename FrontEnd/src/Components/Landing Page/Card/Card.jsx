import classes from "./Card.module.css";

const Card = (props) => {
	return (
		<div className={classes.card}>
			<h1>{props.name}</h1>
			<p>{props.description}</p>
		</div>
	);
};
export default Card;
