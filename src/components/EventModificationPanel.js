import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeStyles } from "@material-ui/core/styles";
import { EventForm } from "./EventForm";
import Paper from "@material-ui/core/Paper";

const eventItemToEdit = createSelector(
  (state) => state.eventItems,
  (eventItems) => eventItems.filter((eventItem) => eventItem.edit === true)
);

export const EventModificationPanel = () => {
  const eventItem = useSelector(eventItemToEdit);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(1),
      borderRadius: 0,
    },
  }));
  const classes = useStyles();
  return (
    <Paper component="div" className={classes.root} elevation={0}>
      <EventForm {...eventItem[0]} />
    </Paper>
  );
};
