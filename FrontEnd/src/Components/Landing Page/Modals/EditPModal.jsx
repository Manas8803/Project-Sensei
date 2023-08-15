import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useContext } from "react";
import classes from "./ProjectModal.module.css";
import {
  ProjectFormContext,
  useProjectFormData,
} from "../../../ContextProvider";

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

export default function EditPModal() {
  const { projectData, setProjectData, p_HandleSubmit } = useProjectFormData();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    p_HandleSubmit(e);
    setOpen(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Button
        className="modal-trigger"
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "solid 1px",
        }}
        onClick={handleOpen}
      >
        Edit
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
            <form className={classes.formP} action="">
              <div>
                <label className={classes.labelP} htmlFor="">
                  Name
                </label>
                <input
                  className={classes.inputP}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={projectData.name}
                  required
                />
              </div>
              <div>
                <label className={classes.labelP} htmlFor="">
                  Description
                </label>
                <textarea
                  className={classes.textareaP}
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={projectData.description}
                  id="description_P"
                ></textarea>
              </div>
            </form>
            <button className={classes.buttonP} onClick={handleClose}>
              Cancel
            </button>
            <button className={classes.buttonP} onClick={handleClose}>
              Submit
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}