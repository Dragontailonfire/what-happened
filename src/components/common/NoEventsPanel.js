import React from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArchiveIcon from "@mui/icons-material/ArchiveTwoTone";
import FavouriteIcon from "@mui/icons-material/FavoriteTwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAllTwoTone";
import EventIcon from "@mui/icons-material/EventTwoTone";
import { green, blueGrey, red } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    borderRadius: 0,
  },
}));

export default function NoEventsPanel(props) {
  const classes = useStyles();

  /*  return (
    <Paper component="div" className={classes.root} elevation={5}>
      <Grid
        spacing={2}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {{
          if((props.type)) {
            return <Grid></Grid>;
          },
        }}
      </Grid>
    </Paper>
  ); */

  if (props.type === "archived") {
    return (
      <Paper component="div" className={classes.root} elevation={15}>
        <Grid
          spacing={2}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs="auto">
            <ArchiveIcon
              htmlColor={blueGrey["A400"]}
              aria-label="archived"
              fontSize="large"
            />
          </Grid>
          <Grid itemxs="auto">
            <Typography variant="h5">No archived Events found!</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  if (props.type === "favourite") {
    return (
      <Paper component="div" className={classes.root} elevation={15}>
        <Grid
          spacing={2}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
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
        </Grid>
      </Paper>
    );
  }
  if (props.type === "saved") {
    return (
      <Paper component="div" className={classes.root} elevation={15}>
        <Grid
          spacing={2}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs="auto">
            <EventIcon color="primary" fontSize="large" />
          </Grid>
          <Grid item xs="auto">
            <Typography variant="h5">No Events found!</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  if (props.type === "completed") {
    return (
      <Paper component="div" className={classes.root} elevation={15}>
        <Grid
          spacing={2}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
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
        </Grid>
      </Paper>
    );
  }
}
