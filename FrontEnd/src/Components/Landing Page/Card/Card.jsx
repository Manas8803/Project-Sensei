import classes from "./Card.module.css";
import EditTModal from "../Modals/EditTModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
const Card = (props) => {
	console.log(props.id);
	return (
		<div className={classes.card} key={props.id}>
			<div className={classes.content}>
				<h1>{props.name}</h1>
				<p>{props.description}</p>
			</div>

			<div className={classes.btnC}>
				<EditTModal />
				<ConfirmDeleteModal id={props.id} name="task" />
			</div>
		</div>
	);
};
export default Card;
