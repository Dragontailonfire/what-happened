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

export default function NotificationEventItem() {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 0,
      borderColor: theme.palette.background.paper,
    },
  }));

  const thisMonthEvents = [
    { title: "Something is happening", daysToEvent: 3 },
    { title: "Something more is happening", daysToEvent: 7 },
    { title: "Something else is happening", daysToEvent: 21 },
  ];
  const nextMonthEvents = [
    { title: "This happens later", daysToEvent: 31 },
    { title: "This one as well", daysToEvent: 45 },
  ];

  const classes = useStyles();
  return (
    <>
      <List className={classes.root} component="ul">
        <ListSubheader>This month</ListSubheader>
        {thisMonthEvents.map((event) => (
          <ListItem divider>
            <ListItemAvatar>
              <Avatar>{event.daysToEvent}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={event.title}
              secondary={"Coming up in " + event.daysToEvent + " days"}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="snooze">
                <SnoozeIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}

        <ListSubheader>Next month</ListSubheader>
        {nextMonthEvents.map((event) => (
          <ListItem divider>
            <ListItemAvatar>
              <Avatar>{event.daysToEvent}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={event.title}
              secondary={"Coming up in " + event.daysToEvent + " days"}
            />
            <ListItemSecondaryAction>
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
