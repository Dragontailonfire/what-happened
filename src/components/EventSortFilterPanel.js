import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EventTagList from "./EventTagList";
import { EventViewOptions } from "./EventViewOptions";

export const EventSortFilterPanel = () => {
  const useStyles = makeStyles((theme) => ({
    view: {
      padding: theme.spacing(2),
      borderRadius: 15,
    },
    tags: {
      padding: theme.spacing(2),
      borderRadius: 15,
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Paper component="div" className={classes.tags} elevation={0}>
        <EventTagList />
      </Paper>
    </>
  );
};
/* <Paper component="div" className={classes.view} elevation={0}>
  <EventViewOptions />
</Paper><br /> */
