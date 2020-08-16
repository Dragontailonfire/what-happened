import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Slide, IconButton } from "@material-ui/core";
import { EventViewOptions } from "../EventViewOptions";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ChangeViewDialog(props) {
  return (
    <Dialog
      id="changeViewDialog"
      TransitionComponent={Transition}
      keepMounted
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="change-view-dialog-title"
      aria-describedby="change-view-dialog-description"
    >
      <DialogTitle id="change-view-dialog-title">
        View by Event type{" "}
        <IconButton
          edge="end"
          color="inherit"
          onClick={props.handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <EventViewOptions />
      </DialogContent>
    </Dialog>
  );
}
