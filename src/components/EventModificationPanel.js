import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { EventForm } from "./EventForm";
import Paper from "@mui/material/Paper";

const eventItemToEdit = createSelector(
  (state) => state.eventItems,
  (eventItems) => eventItems.filter((eventItem) => eventItem.edit === true)
);

export const EventModificationPanel = () => {
  const eventItem = useSelector(eventItemToEdit);

  return (
    <Paper component="div" sx={{ padding: 1, borderRadius: 0 }} elevation={0}>
      <EventForm {...eventItem[0]} />
    </Paper>
  );
};
