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
          badgeContent={5}
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
        <NotificationEventItem />
      </Popover>
    </>
  );
}
