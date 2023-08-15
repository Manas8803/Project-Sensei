import classes from "./CardP.module.css";
import React from "react";
import EditPModal from "../Modals/EditPModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
const CardP = (props) => {
  return (
    <>
      <button
        className={props.selected ? `${classes.selected}` : `${classes.card}`}
        onClick={props.onClick}
        id={props.id}
        key={props.id}
      >
        <h2 className={classes.alingnment} id={props.id}>
          {props.name}
        </h2>
      </button>
      <div className={classes.btnContainer}>
        <EditPModal />
        <ConfirmDeleteModal />
      </div>
    </>
  );
};
export default CardP;
