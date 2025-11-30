import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteConfirmationDialog(props) {
  return (
    <Dialog
      id="deleteDialog"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        {"Delete this " + props.type + "?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          {"You are going to delete '" + props.name + "' " + props.type + "."}
          {props.type === "Tag"
            ? "  This will also remove the tag, if added to any Events."
            : ""}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button id="cancelDelete" onClick={props.handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          id="okDelete"
          variant="contained"
          onClick={props.handleClose}
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
