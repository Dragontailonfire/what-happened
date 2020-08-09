import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as appActions from "../redux/actions/appSettingsActions";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ArchiveIcon from "@material-ui/icons/ArchiveTwoTone";
import FavouriteIcon from "@material-ui/icons/FavoriteTwoTone";
import DoneAllIcon from "@material-ui/icons/DoneAllTwoTone";
import ClearIcon from "@material-ui/icons/Clear";
import { green, pink, blueGrey } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";

export const EventViewOptions = () => {
  const dispatch = useDispatch();
  const [eventStateView, setEventStateView] = useState("");
  const handleEventStateView = (event, newEventStateView) => {
    setEventStateView(newEventStateView);
    dispatch(appActions.changeAppView({ eventView: newEventStateView }));
  };

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs="auto">
          <ToggleButtonGroup
            value={eventStateView}
            exclusive
            orientation="horizontal"
            size="large"
            onChange={handleEventStateView}
            aria-label="text alignment"
          >
            <ToggleButton
              style={{ color: blueGrey["A400"] }}
              value="Archived"
              aria-label="archived"
            >
              {" "}
              {eventStateView === "Archived" ? (
                <>
                  <Typography variant="button">Archived </Typography>
                  <ClearIcon />
                </>
              ) : (
                <ArchiveIcon
                //fontSize={eventStateView === "Archived" ? "large" : "default"}
                />
              )}
            </ToggleButton>
            <ToggleButton
              style={{ color: pink["A400"] }}
              value="Favourites"
              aria-label="favourites"
            >
              {eventStateView === "Favourites" ? (
                <>
                  <Typography variant="button">Favourites </Typography>
                  <ClearIcon />
                </>
              ) : (
                <FavouriteIcon
                //fontSize={eventStateView === "Favourites" ? "large" : "default"}
                />
              )}
            </ToggleButton>
            <ToggleButton
              style={{ color: green["A700"] }}
              value="Completed"
              aria-label="completed"
            >
              {eventStateView === "Completed" ? (
                <>
                  <Typography variant="button">Completed </Typography>
                  <ClearIcon />
                </>
              ) : (
                <>
                  <DoneAllIcon
                  //fontSize={eventStateView === "Completed" ? "large" : "default"}
                  />
                </>
              )}
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};
