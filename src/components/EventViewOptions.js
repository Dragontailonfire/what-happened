import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as appActions from "../redux/actions/appSettingsActions";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ArchiveIcon from "@material-ui/icons/ArchiveRounded";
import FavouriteIcon from "@material-ui/icons/FavoriteRounded";
import DoneAllIcon from "@material-ui/icons/DoneRounded";
import ClearIcon from "@material-ui/icons/Clear";
import { green, pink, blueGrey } from "@material-ui/core/colors";
import { Typography, Paper } from "@material-ui/core";
import { eventView } from "../utilities/constants";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  view: {
    display: "flex",
    padding: theme.spacing(1),
    //backgroundColor: theme.palette.background.default,
    //borderRadius: 25,
    /* position: "sticky",
    top: 70,
    zIndex: 5, */
  },
}));

export const EventViewOptions = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [eventStateView, setEventStateView] = useState("");
  const handleEventStateView = (event, newEventStateView) => {
    setEventStateView(newEventStateView);
    dispatch(appActions.changeAppView({ eventView: newEventStateView }));
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Paper
          component="div"
          className={classes.view}
          elevation={eventStateView && !isSmallScreen ? 10 : 0}
        >
          <ToggleButtonGroup
            value={eventStateView}
            exclusive
            orientation={isSmallScreen ? "vertical" : "horizontal"}
            size="large"
            onChange={handleEventStateView}
            aria-label="text alignment"
          >
            <ToggleButton
              style={{ color: pink["A400"] }}
              value={eventView.FAVOURITE_EVENT_VIEW}
              aria-label="favourites"
            >
              {eventStateView === eventView.FAVOURITE_EVENT_VIEW ? (
                <>
                  <Typography variant="h6">Favourites </Typography>
                  <ClearIcon fontSize="large" />
                </>
              ) : (
                <Tooltip title={"See Favourite Events"} arrow>
                  <FavouriteIcon fontSize="large" />
                </Tooltip>
              )}
            </ToggleButton>
            <ToggleButton
              style={{ color: green["A700"] }}
              value={eventView.COMPLETED_EVENT_VIEW}
              aria-label="completed"
            >
              {eventStateView === eventView.COMPLETED_EVENT_VIEW ? (
                <>
                  <Typography variant="h6">Completed </Typography>
                  <ClearIcon fontSize="large" />
                </>
              ) : (
                <>
                  <Tooltip title={"See Completed Events"} arrow>
                    <DoneAllIcon fontSize="large" />
                  </Tooltip>
                </>
              )}
            </ToggleButton>
            <ToggleButton
              style={{ color: blueGrey["A400"] }}
              value={eventView.ARCHIVED_EVENT_VIEW}
              aria-label="archived"
            >
              {" "}
              {eventStateView === eventView.ARCHIVED_EVENT_VIEW ? (
                <>
                  <Typography variant="h6">Archived </Typography>
                  <ClearIcon fontSize="large" />
                </>
              ) : (
                <Tooltip title={"See Archived Events"} arrow>
                  <ArchiveIcon fontSize="large" />
                </Tooltip>
              )}
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Grid>
    </Grid>
  );
};
