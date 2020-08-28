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
import { IconButton } from "@material-ui/core";
import { EventViewOptions } from "./EventViewOptions";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Sticky from "react-stickynode";
import BottomActionBar from "./common/BottomActionBar";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  manageEvents: {
    [theme.breakpoints.down("sm")]: {
      //visibility: "hidden",
      display: "none",
    },
    /* position: "sticky",
    top: 70, */
  },
  filterPanel: {
    [theme.breakpoints.down("sm")]: {
      //visibility: "hidden",
      display: "none",
    },
    /* position: "sticky",
    top: 70, */
  },
  view: {
    display: "flex",
    padding: theme.spacing(2),
    //borderRadius: 25,
    /* position: "sticky",
    top: 70,
    zIndex: 5, */
  },
  mainEventList: {
    /* position: "sticky",
    top: 70, */
  },
}));

export default function EventDashboard() {
  const classes = useStyles();
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <ThemeProvider theme>
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
            spacing={0}
            container
            direction="row"
            justify="space-around"
            alignItems="stretch"
          >
            <Grid item className={classes.filterPanel} md={2} xl={2} lg={2}>
              <Sticky enabled={false} top={120} bottomBoundary="#bottom-anchor">
                <EventSortFilterPanel />
              </Sticky>
            </Grid>
            <Grid
              className={classes.mainEventList}
              item
              xl={5}
              lg={4}
              md={4}
              sm={10}
              xs={12}
            >
              <FinalSortedFilteredEventList />
            </Grid>
            <Grid className={classes.manageEvents} item md={4} xl={4} lg={4}>
              <Sticky enabled={true} top={120} bottomBoundary="#bottom-anchor">
                <EventViewOptions />
                <br />
                <EventModificationPanel />
              </Sticky>
            </Grid>
          </Grid>
        </Container>
        <QuickActions />
        <div className={classes.offset} />
        <BottomActionBar />
        <SiteFooter />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
