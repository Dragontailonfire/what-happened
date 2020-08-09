import React from "react";
import SnoozeIcon from "@material-ui/icons/SnoozeRounded";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

export default function NotificationEventItem({
  thisMonthEvents,
  nextMonthEvents,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      //borderRadius: 25,
      borderColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();
  return (
    <>
      <List className={classes.root} component="ul">
        <ListSubheader>This month upcoming</ListSubheader>
        {thisMonthEvents.length < 1 && (
          <>
            <ListItemText inset primary="No events" />
          </>
        )}
        {thisMonthEvents.map((event) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>{event.daysToEvent}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={event.title}
              //secondary={"Coming up in " + event.daysToEvent + " days"}
            />
            <ListItemSecondaryAction hidden>
              <IconButton edge="end" aria-label="snooze">
                <SnoozeIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem divider />
        <ListSubheader>Next month upcoming</ListSubheader>
        {nextMonthEvents.length < 1 && (
          <ListItemText inset primary="No events" />
        )}
        {nextMonthEvents.map((event) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>{event.daysToEvent}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={event.title}
              //secondary={"Coming up in " + event.daysToEvent + " days"}
            />
            <ListItemSecondaryAction hidden>
              <IconButton edge="end" aria-label="snooze">
                <SnoozeIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
