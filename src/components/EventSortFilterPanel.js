import React from "react";
import Paper from "@mui/material/Paper";
import EventTagList from "./EventTagList";
import { EventViewOptions } from "./EventViewOptions";

export const EventSortFilterPanel = () => {
  return (
    <>
      <Paper component="div" sx={{ padding: 1, borderRadius: 0 }} elevation={0}>
        <EventViewOptions />
      </Paper>
      <br />
      <Paper component="div" sx={{ padding: 1, borderRadius: 0 }} elevation={0}>
        <EventTagList />
      </Paper>
    </>
  );
};
