import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { EventSortFilterPanel } from "../EventSortFilterPanel";

export default function ManageFilterDialog(props) {
  return (
    <Dialog
      id="filterDialog"
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
