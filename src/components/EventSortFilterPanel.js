import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EventTagList from "./EventTagList";
import { EventViewOptions } from "./EventViewOptions";
import { Grid } from "@material-ui/core";

export const EventSortFilterPanel = () => {
  const useStyles = makeStyles((theme) => ({
    tags: {
      padding: theme.spacing(1),
      //backgroundColor: theme.palette.background.default,
      //borderRadius: 25,
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <EventTagList />
        </Grid>
      </Grid>
    </>
  );
};
