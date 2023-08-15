import classes from "./Card.module.css";
import EditTModal from "../Modals/EditTModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
const Card = (props) => {
	const { display } = props;
	return (
		<div className={`${classes.card}`} style={{ display: props.display }}>
			<>
				<h1>{props.name}</h1>
				<p>{props.description}</p>
				<div className={classes.btnC}>
					<EditTModal />
					<ConfirmDeleteModal />
				</div>
			</>
		</div>
	);
};
export default Card;
