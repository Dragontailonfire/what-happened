import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArchiveIcon from "@material-ui/icons/ArchiveRounded";
import FavouriteIcon from "@material-ui/icons/FavoriteRounded";
import DoneAllIcon from "@material-ui/icons/Done";
import EventIcon from "@material-ui/icons/EventRounded";
import { green, blueGrey, red } from "@material-ui/core/colors";
import { Grow } from "@material-ui/core";
import { eventType } from "../../utilities/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    //borderRadius: 25,
  },
}));

export default function NoEventsPanel({ type }) {
  const classes = useStyles();

  const FinalNoEventCard = (props) => {
    switch (type) {
      case eventType.ARCHIVED_EVENT_TYPE:
        return (
          <div {...props}>
            <Grid item xs="auto">
              <ArchiveIcon
                htmlColor={blueGrey["A400"]}
                aria-label="archived"
                fontSize="large"
              />
            </Grid>
            <Grid item xs="auto">
              <Typography variant="h5">No archived Events found!</Typography>
            </Grid>
          </div>
        );
      case eventType.FAVOURITE_EVENT_TYPE:
        return (
          <>
            <Grid item xs="auto">
              <FavouriteIcon
                htmlColor={red["A400"]}
                aria-label="favourite"
                fontSize="large"
              />
            </Grid>
            <Grid item xs="auto">
              <Typography variant="h5">No favourites found!</Typography>
            </Grid>
          </>
        );
      case eventType.COMPLETED_EVENT_TYPE:
        return (
          <>
            <Grid item xs="auto">
              <DoneAllIcon
                htmlColor={green["A700"]}
                aria-label="completed"
                fontSize="large"
              />
            </Grid>
            <Grid item xs="auto">
              <Typography variant="h5">No completed Events found!</Typography>
            </Grid>
          </>
        );
      /* case "saved":
        return (
          <>
            <Grid item xs="auto">
              <EventIcon color="primary" fontSize="large" />
            </Grid>
            <Grid item xs="auto">
              <Typography variant="h5">No Events found!</Typography>
            </Grid>
          </>
        ); */
      default:
        return (
          <>
            <Grid item xs="auto">
              <EventIcon color="primary" fontSize="large" />
            </Grid>
            <Grid item xs="auto">
              <Typography variant="h5">No Events found!</Typography>
            </Grid>
          </>
        );
    }
  };
  return (
    <Grow in={true}>
      <Paper component="div" className={classes.root} elevation={0}>
        <Grid
          spacing={2}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <FinalNoEventCard />
        </Grid>
      </Paper>
    </Grow>
  );
}
