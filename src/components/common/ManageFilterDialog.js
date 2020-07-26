import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EventSortFilterPanel } from "../EventSortFilterPanel";
import { Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ManageFilterDialog(props) {
  return (
    <Dialog
      id="filterDialog"
      TransitionComponent={Transition}
      keepMounted
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="filter-dialog-title"
      aria-describedby="filter-dialog-description"
    >
      <DialogTitle id="filter-dialog-title">Filter Events</DialogTitle>
      <DialogContent>
        <EventSortFilterPanel />
      </DialogContent>
    </Dialog>
  );
}
