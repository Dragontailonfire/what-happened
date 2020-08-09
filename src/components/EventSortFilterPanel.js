import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EventTagList from "./EventTagList";
import { EventViewOptions } from "./EventViewOptions";

export const EventSortFilterPanel = () => {
  const useStyles = makeStyles((theme) => ({
    tags: {
      padding: theme.spacing(0),
      //borderRadius: 25,
    },
  }));
  const classes = useStyles();
  return (
      <Paper component="div" className={classes.tags} elevation={0}>
        <EventTagList />
      </Paper>
  );
};
