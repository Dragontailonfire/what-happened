import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import * as eventActions from "../redux/actions/eventItemActions";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import UnarchiveSharpIcon from "@material-ui/icons/UnarchiveTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import EditIcon from "@material-ui/icons/EditTwoTone";
import FavouriteIcon from "@material-ui/icons/FavoriteTwoTone";
import DoneIcon from "@material-ui/icons/DoneRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMoreRounded";
import LabelIcon from "@material-ui/icons/LabelRounded";
import PinnedIcon from "@material-ui/icons/PinDropTwoTone";
import PinIcon from "@material-ui/icons/RoomTwoTone";
import { pink, green } from "@material-ui/core/colors";
import _ from "lodash";
import DeleteConfirmationDialog from "./common/DeleteConfirmationDialog";
import { StyleSheet, css } from "aphrodite";
import jello from "react-animations/lib/jello";
import swing from "react-animations/lib/swing";
import flip from "react-animations/lib/flip";
import bounceOut from "react-animations/lib/bounceOut";

const useStyles = makeStyles((theme) => ({
  root: {
    //borderRadius: 10,
    transition: "0.1s",
    "&:hover": {
      //transform: "translateY(-10px)",
      //transform: "scale(1.01)",
    },
    //borderColor: theme.palette.background.default,
    padding: -30,
  },
  editMode: {
    transform: "scale(1.07)",
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  tags: { marginLeft: "auto" },
  selectedFavouriteIcon: { color: pink["A400"] },
}));

const styles = StyleSheet.create({
  iconEffect: {
    ":hover": {
      animationName: jello,
      animationIterationCount: 2,
      animationDuration: "0.7s",
      backgroundColor: "transparent",
    },
  },
  iconEffectDelete: {
    ":hover": {
      animationName: bounceOut,
      animationDuration: "0.7s",
      backgroundColor: "transparent",
    },
  },
  iconEffectArchive: {
    ":hover": {
      animationName: flip,
      animationDuration: "0.7s",
      backgroundColor: "transparent",
    },
  },
  iconEffectEdit: {
    ":hover": {
      animationName: swing,
      animationDuration: "0.7s",
      backgroundColor: "transparent",
    },
  },
});

export const EventItemCard = (props) => {
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteDialogClose = (event) => {
    if (event.target.textContent === "Delete") {
      const editedData = { ...props };
      editedData.edit = false;
      delete editedData.tags;

      // map = extract property values as array
      editedData.tags = _.map(props.tags, "tagName");
      dispatch(eventActions.deleteEventItem(editedData));
      enqueueSnackbar("Event '" + eventToDelete + "' is deleted!", {
        variant: "success",
      });
    }
    setOpenDeleteDialog(false);

    setEventToDelete("");
  };

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleEditClick = () => {
    const editedData = { ...props };
    editedData.edit = true;
    delete editedData.tags;

    // map = extract property values as array
    editedData.tags = _.map(props.tags, "tagName");
    dispatch(eventActions.updatingEventItem(editedData));
  };

  const handleFavouriteClick = () => {
    const editedData = { ...props };
    editedData.favourite = !props.favourite;
    delete editedData.tags;

    // map = extract property values as array
    editedData.tags = _.map(props.tags, "tagName");
    dispatch(eventActions.favouriteEventItem(editedData));
  };

  const handleArchiveClick = () => {
    const editedData = { ...props };
    editedData.archived = !props.archived;
    editedData.favourite = false;
    editedData.edit = false;
    //setEditMode(editedData.edit);
    delete editedData.tags;

    // map = extract property values as array
    editedData.tags = _.map(props.tags, "tagName");
    dispatch(eventActions.archiveEventItem(editedData));
  };

  return (
    <>
      <Card
        square
        id={"event-item-" + props.id}
        //className={classes.root}
        className={clsx(classes.root, {
          [classes.editMode]: expanded,
        })}
        variant="elevation"
        elevation={0}
      >
        <CardHeader
          title={
            <Typography id={"event-title-" + props.id} variant="h6">
              {props.title}
            </Typography>
          }
          action={
            <IconButton aria-label="pin-event">
              <PinIcon />
            </IconButton>
          }
          avatar={props.endDate && <DoneIcon htmlColor={green["A700"]} />}
          subheader={
            props.endDate ? (
              <Typography variant="overline">
                {"Time period: " + props.finishedDuration}
              </Typography>
            ) : (
              ""
            )
          }
        />
        <CardContent>
          <Typography
            id={"event-duration-" + props.id}
            variant="h6"
            color="textSecondary"
          >
            {props.duration}
          </Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography
              id={"event-description-" + props.id}
              gutterBottom
              variant="h6"
            >
              {props.description}
            </Typography>
            <Typography
              variant="h6"
              id={"event-startdate-" + props.id}
              className="card-subtitle mb-2 text-muted"
            >
              {"Happened on " + new Date(props.startDate).toDateString()}
            </Typography>
            {props.endDate && (
              <Typography
                variant="h6"
                id={"event-enddate-" + props.id}
                className="card-subtitle mb-2 text-muted"
              >
                {"Ended on " + new Date(props.endDate).toDateString()}
              </Typography>
            )}
          </Collapse>
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <Tooltip title={props.edit ? "Editing..." : "Edit this event"} arrow>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              hidden={props.archived}
              name="editEvent"
              id={"event-edit-button-" + props.id}
              className={css(styles.iconEffectEdit)}
              aria-expanded={expanded}
              onClick={handleEditClick}
            >
              {props.edit ? (
                <EditIcon fontSize="large" color="secondary" />
              ) : (
                <EditIcon fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              props.favourite ? "Remove from Favourites" : "Add to Favourites"
            }
            arrow
          >
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              hidden={props.archived}
              id={"event-favourite-button-" + props.id}
              className={css(styles.iconEffect)}
              aria-label="favourite event"
              onClick={handleFavouriteClick}
            >
              {props.favourite ? (
                <FavouriteIcon
                  fontSize="large"
                  className={classes.selectedFavouriteIcon}
                />
              ) : (
                <FavouriteIcon fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              props.archived ? "Unarchive this event" : "Archive this event"
            }
            arrow
          >
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              className={css(styles.iconEffectArchive)}
              id={"event-archive-button-" + props.id}
              onClick={handleArchiveClick}
              aria-label="archive event"
            >
              {props.archived ? (
                <UnarchiveSharpIcon fontSize="large" color="secondary" />
              ) : (
                <ArchiveIcon fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete this event" arrow>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              className={css(styles.iconEffectDelete)}
              id={"event-delete-button-" + props.id}
              aria-label="delete event"
              onClick={() => {
                setEventToDelete(props.title);
                setOpenDeleteDialog(true);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Typography className={classes.tags}>
            {props.tags.map((tag) => (
              <Tooltip key={tag.tagName} title={tag.tagName} arrow interactive>
                <LabelIcon htmlColor={tag.colour} fontSize="large" />
              </Tooltip>
            ))}
          </Typography>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => {
              setExpanded(!expanded);
            }}
            id={"event-expand-button-" + props.id}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        </CardActions>
      </Card>
      <DeleteConfirmationDialog
        type="Event"
        name={eventToDelete}
        open={openDeleteDialog}
        handleClose={handleDeleteDialogClose}
      />
    </>
  );
};
