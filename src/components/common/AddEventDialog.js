import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EventModificationPanel } from "../EventModificationPanel";

export default function AddEventDialog(props) {
  return (
    <Dialog
      id="addEventDialog"
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="add-event-dialog-title"
      aria-describedby="add-event-dialog-description"
    >
      <DialogTitle id="add-event-dialog-title">Add new Event</DialogTitle>
      <DialogContent>
        <EventModificationPanel />
      </DialogContent>
    </Dialog>
  );
}
