import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as appActions from "../redux/actions/appSettingsActions";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ArchiveIcon from "@material-ui/icons/ArchiveTwoTone";
import FavouriteIcon from "@material-ui/icons/FavoriteTwoTone";
import DoneAllIcon from "@material-ui/icons/DoneAllTwoTone";
import { green, pink, blueGrey } from "@material-ui/core/colors";

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
            size="large"
            onChange={handleEventStateView}
            aria-label="text alignment"
          >
            <ToggleButton
              style={{ color: blueGrey["A400"] }}
              value="Archived"
              aria-label="archived"
            >
              <ArchiveIcon
                fontSize={eventStateView === "Archived" ? "large" : "default"}
              />
            </ToggleButton>
            <ToggleButton
              style={{ color: pink["A400"] }}
              value="Favourites"
              aria-label="favourites"
            >
              <FavouriteIcon
                fontSize={eventStateView === "Favourites" ? "large" : "default"}
              />
            </ToggleButton>
            <ToggleButton
              style={{ color: green["A700"] }}
              value="Completed"
              aria-label="completed"
            >
              <DoneAllIcon
                fontSize={eventStateView === "Completed" ? "large" : "default"}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};
