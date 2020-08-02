import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeStyles } from "@material-ui/core/styles";
import { EventForm } from "./EventForm";
import Paper from "@material-ui/core/Paper";
import { Button, Collapse, Grow, Zoom } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddBoxTwoTone";

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
      padding: theme.spacing(1),
      borderRadius: 5,
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
          style={{
            height: 375,
          }}
        >
          New Event
        </Button>
      </div>
    );
  };

  return (
    <>
      <Paper component="div" className={classes.root} elevation={0}>
        <Grow in={!displayForm}>
          <AddEventButton />
        </Grow>
        <Grow in={displayForm}>
          <EventFormPanel />
        </Grow>
      </Paper>
    </>
  );
};
