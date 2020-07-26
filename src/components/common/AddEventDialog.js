import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EventModificationPanel } from "../EventModificationPanel";
import { Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddEventDialog(props) {
  return (
    <Dialog
      id="addEventDialog"
      TransitionComponent={Transition}
      keepMounted
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
