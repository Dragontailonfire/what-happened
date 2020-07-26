import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActiveTwoTone";
import IconButton from "@material-ui/core/IconButton";
import NotificationEventItem from "../NotificationEventItem";
//import NotificationEventItemLoader from "./NotificationEventItemLoader";
import { Badge } from "@material-ui/core";
import { StyleSheet, css } from "aphrodite";
import shake from "react-animations/lib/headShake";
import isThisMonth from "date-fns/isThisMonth";
import addMonths from "date-fns/addMonths";
import isSameMonth from "date-fns/isSameMonth";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { useSelector } from "react-redux";
import _ from "lodash";

/* const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
})); */

const styles = StyleSheet.create({
  iconEffect: {
    ":hover": {
      animationName: shake,
      animationDuration: "0.7s",
      backgroundColor: "transparent",
    },
  },
});

export default function NotificationPopup() {
  //const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const allItems = useSelector((state) => state.eventItems);
  const thisMonthItems = [
    ...allItems.filter((item) => isThisMonth(new Date(item.startDate))),
  ];
  var nextMonthDate = addMonths(new Date(), 1);
  const nextMonthItems = [
    ...allItems.filter((item) =>
      isSameMonth(new Date(item.startDate), new Date(nextMonthDate))
    ),
  ];

  const itemsCount = thisMonthItems.length + nextMonthItems.length;

  const thisMonth = _.mapValues(thisMonthItems, (value, key) => {
    return { title: value.title, daysToEvent: 6 };
  });
  console.log(thisMonth);
  const nextMonth = [
    { title: "This happens later", daysToEvent: 31 },
    { title: "This one as well", daysToEvent: 45 },
  ];

  return (
    <>
      <IconButton
        className={css(styles.iconEffect)}
        aria-describedby={id}
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        <Badge
          badgeContent={itemsCount}
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <NotificationsActiveIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <NotificationEventItem
          thisMonthEvents={thisMonthItems}
          nextMonthEvents={nextMonthItems}
        />
      </Popover>
    </>
  );
}
