import React from "react";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { EventModificationPanel } from "./EventModificationPanel";
import { FinalSortedFilteredEventList } from "./FinalSortedFilteredEventList";
import { ThemeProvider } from "@material-ui/styles";
import NavBar from "./Navbar";
import SiteFooter from "./SiteFooter";
import Grid from "@material-ui/core/Grid";
import { EventSortFilterPanel } from "./EventSortFilterPanel";
import QuickActions from "./common/QuickActions";
import { IconButton, Paper } from "@material-ui/core";
import { EventViewOptions } from "./EventViewOptions";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  manageEvents: {
    [theme.breakpoints.down("md")]: {
      //visibility: "hidden",
      display: "none",
    },
    position: "sticky",
    top: 70,
  },
  filterPanel: {
    [theme.breakpoints.down("md")]: {
      //visibility: "hidden",
      display: "none",
    },
    position: "sticky",
    top: 70,
  },
  view: {
    padding: theme.spacing(2),
    borderRadius: 15,
    /* position: "sticky",
    top: 70,
    zIndex: 5, */
  },
  mainEventList: {
    position: "sticky",
    top: 70,
  },
}));

export default function EventDashboard() {
  const classes = useStyles();
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <ThemeProvider>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={1}
        hideIconVariant
        action={(key) => (
          <IconButton onClick={onClickDismiss(key)}>
            <CloseRoundedIcon />
          </IconButton>
        )}
      >
        <CssBaseline />
        <NavBar />
        <div id="back-to-top-anchor" className={classes.offset} />
        <Container maxWidth="lg">
          <Grid
            spacing={10}
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid className={classes.manageEvents} item md={4}>
              <EventModificationPanel />
              <br />
              <Paper component="div" className={classes.view} elevation={0}>
                <EventViewOptions />
              </Paper>
            </Grid>
            <Grid className={classes.mainEventList} item lg={5} xs={11}>
              <FinalSortedFilteredEventList />
            </Grid>
            <Grid item className={classes.filterPanel} md={3}>
              <EventSortFilterPanel />
            </Grid>
            <Grid item>
              <QuickActions />
            </Grid>
          </Grid>
        </Container>
        <SiteFooter />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
