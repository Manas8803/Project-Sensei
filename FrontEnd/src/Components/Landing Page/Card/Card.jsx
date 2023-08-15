import classes from "./Card.module.css";
import EditTModal from "../Modals/EditTModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
const Card = (props) => {
  return (
    <div className={classes.card}>
        <div className={classes.content}>
          <h1>{props.name}</h1>
			    <p>{props.description}</p>
        </div>

        <div className={classes.btnC}>
          <EditTModal />
          <ConfirmDeleteModal />
        </div>
    </div>
  );
};
export default Card;


