import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EventTagList from "./EventTagList";
import { EventViewOptions } from "./EventViewOptions";

export const EventSortFilterPanel = () => {
  const useStyles = makeStyles((theme) => ({
    tags: {
      padding: theme.spacing(2),
      //backgroundColor: theme.palette.background.default,
      //borderRadius: 25,
    },
  }));
  const classes = useStyles();
  return (
      <>
        <EventTagList />
      </>
  );
};
