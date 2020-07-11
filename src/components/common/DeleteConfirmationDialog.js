import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
