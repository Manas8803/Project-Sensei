import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import classes from "./TaskModal.module.css";
import { useTaskFormData } from "../../../ContextProvider";

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

export default function ConfirmDeleteModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    handleClose(e);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "solid 1px",
          borderRadius: "6px",
        }}
      >
        Delete
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
            <p>Are you sure You want to Delete ??</p>
            <button className={classes.buttonT} onClick={handleClose}>
              Cancel
            </button>
            <button className={classes.buttonT} onClick={handleSubmit}>
              Delete
            </button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}