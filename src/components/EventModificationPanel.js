import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeStyles } from "@material-ui/core/styles";
import { EventForm } from "./EventForm";
import Paper from "@material-ui/core/Paper";
import { Button, Collapse, Grow, Zoom, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircle";

const eventItemToEdit = createSelector(
  (state) => state.eventItems,
  (eventItems) => eventItems.filter((eventItem) => eventItem.edit === true)
);

export const EventModificationPanel = () => {
  const eventItem = useSelector(eventItemToEdit);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    if (eventItem.length > 0) setDisplayForm(true);
  }, [eventItem, displayForm, setDisplayForm]);

  const closePanel = () => {
    setDisplayForm(false);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      //display: "flex",
      padding: theme.spacing(1),
      //backgroundColor: theme.palette.background.default,
      //borderRadius: 25,
    },
  }));
  const classes = useStyles();

  const EventFormPanel = (props) => {
    return (
      <div hidden={!displayForm} {...props}>
        <EventForm {...eventItem[0]} closePanel={closePanel} />
      </div>
    );
  };

  const AddEventButton = (props) => {
    return (
      <div hidden={displayForm} {...props}>
        <Button
          fullWidth
          size="large"
          variant="text"
          color="secondary"
          onClick={() => {
            setDisplayForm(true);
          }}
          startIcon={<AddIcon />}
          style={
            {
              //height: 75,
            }
          }
        >
          NEW EVENT
        </Button>
      </div>
    );
  };

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="">
        <Grid item>
          <Paper
            component="div"
            className={classes.root}
            elevation={displayForm ? 10 : 0}
          >
            <Grow in={!displayForm}>
              <AddEventButton />
            </Grow>
            <Grow in={displayForm}>
              <EventFormPanel />
            </Grow>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
