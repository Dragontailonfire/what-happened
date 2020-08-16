import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EventTagList from "../EventTagList";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ManageFilterDialog(props) {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      id="filterDialog"
      TransitionComponent={Transition}
      keepMounted
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="filter-dialog-title"
      aria-describedby="filter-dialog-description"
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            TAGS
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <EventTagList />
      </DialogContent>
    </Dialog>
  );
}
