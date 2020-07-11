import React from "react";
import { SnackbarProvider } from "notistack";
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
  mainEventList: {
    position: "sticky",
    top: 70,
  },
}));

export default function EventDashboard() {
  const classes = useStyles();

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={1} hideIconVariant>
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
