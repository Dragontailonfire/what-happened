import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EventForm } from "../EventForm";
import { Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const eventItemToEdit = createSelector(
  (state) => state.eventItems,
  (eventItems) => eventItems.filter((eventItem) => eventItem.edit === true)
);

export default function AddEventDialog(props) {
  const classes = useStyles();
  const [displayForm, setDisplayForm] = useState(false);
  const eventItem = useSelector(eventItemToEdit);
  useEffect(() => {
    if (eventItem.length > 0) setDisplayForm(true);
  }, [eventItem, displayForm, setDisplayForm]);

  const closePanel = () => {
    setDisplayForm(false);
  };

  return (
    <Dialog
      id="addEventDialog"
      className={classes.root}
      TransitionComponent={Transition}
      keepMounted
      //open={props.open | displayForm}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="add-event-dialog-title"
      aria-describedby="add-event-dialog-description"
    >
      {/* <DialogTitle id="add-event-dialog-title">Add new Event</DialogTitle> */}
      <DialogContent>
        <EventForm {...eventItem[0]} closePanel={closePanel} />
      </DialogContent>
    </Dialog>
  );
}
