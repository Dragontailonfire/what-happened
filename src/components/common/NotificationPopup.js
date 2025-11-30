import React from "react";
//import { makeStyles } from "@mui/styles";
import Popover from "@mui/material/Popover";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import IconButton from "@mui/material/IconButton";
import NotificationEventItem from "../NotificationEventItem";
//import NotificationEventItemLoader from "./NotificationEventItemLoader";
import { Badge } from "@mui/material";
import { keyframes } from "@emotion/react";

/* const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
})); */

const shake = keyframes`
  0% { transform: translateX(0); }
  6.5% { transform: translateX(-6px) rotateY(-9deg); }
  18.5% { transform: translateX(5px) rotateY(7deg); }
  31.5% { transform: translateX(-3px) rotateY(-5deg); }
  43.5% { transform: translateX(2px) rotateY(3deg); }
  50% { transform: translateX(0); }
`;

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
        sx={{
          "&:hover": {
            animation: `${shake} 0.7s`,
            backgroundColor: "transparent",
          },
        }}
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
