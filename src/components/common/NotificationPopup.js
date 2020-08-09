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
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import toDate from "date-fns/toDate";
import isFuture from "date-fns/isFuture";

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
      //backgroundColor: "transparent",
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

  const convertToThisYearDate = (actualDate) => {
    console.log("Actual date");
    console.log(actualDate);
    let day = getDate(new Date(actualDate));
    let month = getMonth(new Date(actualDate));
    let year = getYear(new Date());
    let newDate = toDate(
      new Date(parseInt(year), parseInt(month), parseInt(day))
    );
    console.log("New date");
    console.log(newDate);
    return newDate;
  };

  const allItems = useSelector((state) => state.eventItems);
  console.log("All items");
  console.log(allItems);

  const activeAnnualItems = allItems.filter(
    (item) => !item.archived && item.setReminder
  );

  console.log("Active  annual items");
  console.log(activeAnnualItems);

  const sortedItems = _.sortBy(activeAnnualItems, [
    function (a) {
      return differenceInCalendarDays(
        convertToThisYearDate(a.startDate),
        new Date()
      );
    },
    "title",
  ]);

  console.log("Sorted Active  annual items");
  console.log(sortedItems);

  const thisMonthItems = [
    ...sortedItems.filter(
      (item) =>
        isThisMonth(convertToThisYearDate(item.startDate)) &&
        isFuture(convertToThisYearDate(item.startDate))
    ),
  ];

  console.log("This month Sorted Active  annual items");
  console.log(sortedItems);

  var nextMonthDate = addMonths(new Date(), 1);

  const nextMonthItems = [
    ...sortedItems.filter((item) =>
      isSameMonth(
        convertToThisYearDate(item.startDate),
        new Date(nextMonthDate)
      )
    ),
  ];

  const itemsCount = thisMonthItems.length + nextMonthItems.length;

  const thisMonth = thisMonthItems.map((item) => {
    return {
      title: item.title,
      daysToEvent: differenceInCalendarDays(
        convertToThisYearDate(item.startDate),
        new Date()
      ),
    };
  });

  const nextMonth = nextMonthItems.map((item) => {
    return {
      title: item.title,
      daysToEvent: differenceInCalendarDays(
        convertToThisYearDate(item.startDate),
        new Date()
      ),
    };
  });

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
          color="primary"
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
          thisMonthEvents={thisMonth}
          nextMonthEvents={nextMonth}
        />
      </Popover>
    </>
  );
}
