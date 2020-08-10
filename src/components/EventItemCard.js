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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArchiveIcon from "@material-ui/icons/ArchiveRounded";
import UnarchiveSharpIcon from "@material-ui/icons/UnarchiveRounded";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import EditIcon from "@material-ui/icons/EditRounded";
import FavouriteIcon from "@material-ui/icons/FavoriteTwoTone";
import DoneIcon from "@material-ui/icons/DoneRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMoreRounded";
import LabelIcon from "@material-ui/icons/Stop";
import PinnedIcon from "@material-ui/icons/PinDropTwoTone";
import GradeIcon from "@material-ui/icons/GradeTwoTone";
import { pink, green, red, yellow, common } from "@material-ui/core/colors";
import _ from "lodash";
import DeleteConfirmationDialog from "./common/DeleteConfirmationDialog";
import { StyleSheet, css } from "aphrodite";
import jello from "react-animations/lib/jello";
import swing from "react-animations/lib/swing";
import flip from "react-animations/lib/flip";
import bounceOut from "react-animations/lib/bounceOut";

const useStyles = makeStyles((theme) => ({
  root: {
    //borderRadius: 15,
    //borderTopLeftRadius: 0,
    //borderBottomLeftRadius: 0,
    //borderColor: "#9745ff",
    //borderRight: "5px solid",
    borderLeft: "5px solid",
    transition: "0.1s",
    "&:hover": {
      //transform: "translateY(-10px)",
      //transform: "scale(1.01)",
    },
    //borderColor: theme.palette.background.default,
    //padding: -30,
  },
  editMode: {
    transform: "scale(1.07)",
  },

  expand: {
    //transform: "rotate(0deg)",
    marginLeft: "auto",
    /* marginRight: -9,
    marginBottom: -8, */
    //borderRadius: 25,
    //marginTop: -10,
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    //transform: "rotate(180deg)",
  },
  tags: { marginLeft: "auto" },
  selectedFavouriteIcon: { color: pink["A400"] },
  tagDisplay: {
    marginRight: -20,
    marginBottom: -60,
    marginLeft: 10,
  },
}));

const styles = StyleSheet.create({
  iconEffect: {
    ":hover": {
      animationName: jello,
      animationIterationCount: 2,
      animationDuration: "0.7s",
      //backgroundColor: "transparent",
    },
  },
  iconEffectDelete: {
    ":hover": {
      animationName: bounceOut,
      animationDuration: "0.7s",
      //backgroundColor: "transparent",
    },
  },
  iconEffectArchive: {
    ":hover": {
      animationName: flip,
      animationDuration: "0.7s",
      //backgroundColor: "transparent",
    },
  },
  iconEffectEdit: {
    ":hover": {
      animationName: swing,
      animationDuration: "0.7s",
      //backgroundColor: "transparent",
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
    <div>
      <div>
        <Typography gutterBottom>
          {props.tags.map((tag) => (
            <Tooltip key={tag.tagName} title={tag.tagName} arrow interactive>
              <LabelIcon
                className={classes.tagDisplay}
                htmlColor={tag.colour}
                fontSize="medium"
              />
            </Tooltip>
          ))}
        </Typography>
      </div>
      <Card
        //square
        id={"event-item-" + props.id}
        //className={classes.root}
        className={clsx(classes.root, {
          [classes.editMode]: expanded,
        })}
        variant="elevation"
        elevation={24}
        style={{ borderColor: props.cardColor }}
      >
        <CardHeader
          title={
            <Typography id={"event-title-" + props.id} variant="h6">
              {props.title}
            </Typography>
          }
          action={
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
          }
          avatar={
            props.completedEvent && <DoneIcon htmlColor={green["A700"]} />
          }
          subheader={
            props.completedEvent && (
              <Typography
                variant="overline"
                id={"event-completed-duration-" + props.id}
              >
                {"Event Duration: " + props.detailedDuration}
              </Typography>
            )
          }
        />
        <CardContent>
          <Typography
            id={"event-duration-" + props.id}
            variant="body1"
            color="textSecondary"
            gutterBottom
          >
            {props.duration}
          </Typography>

          <Collapse in={expanded} /* timeout="auto" unmountOnExit */>
            <Typography id={"event-description-" + props.id} variant="body1">
              {props.description}
            </Typography>
            <Typography variant="body1" id={"event-startdate-" + props.id}>
              {"Happened on " + new Date(props.startDate).toDateString()}
            </Typography>
            {props.completedEvent && (
              <Typography variant="body1" id={"event-enddate-" + props.id}>
                {"Ended on " + new Date(props.endDate).toDateString()}
              </Typography>
            )}
            <Typography
              id={"event-total-duration-" + props.id}
              gutterBottom
              variant="body1"
            >
              {"Event Duration: " + props.detailedDuration}
            </Typography>
            <Typography >
              {props.tags.map((tag) => (
                <Tooltip
                  key={tag.tagName}
                  title={tag.tagName}
                  arrow
                  interactive
                >
                  <LabelIcon htmlColor={tag.colour} fontSize="medium" />
                </Tooltip>
              ))}
            </Typography>
          </Collapse>
        </CardContent>
        {/* <Divider
          variant="middle"
          style={{
            //backgroundColor: props.cardColor,
            borderColor: props.cardColor,
            //border: "1px solid",
          }}
        /> */}
        <CardActions disableSpacing>
          <Tooltip title={props.edit ? "Editing..." : "Edit this event"} arrow>
            <IconButton
              /* disableRipple
              disableFocusRipple
              disableTouchRipple */
              hidden={props.archived}
              name="editEvent"
              id={"event-edit-button-" + props.id}
              className={css(styles.iconEffectEdit)}
              aria-expanded={expanded}
              onClick={handleEditClick}
            >
              {props.edit ? <EditIcon color="secondary" /> : <EditIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              props.archived ? "Unarchive this event" : "Archive this event"
            }
            arrow
          >
            <IconButton
              /* disableRipple
              disableFocusRipple
              disableTouchRipple */
              className={css(styles.iconEffectArchive)}
              id={"event-archive-button-" + props.id}
              onClick={handleArchiveClick}
              aria-label="archive event"
            >
              {props.archived ? (
                <UnarchiveSharpIcon color="secondary" />
              ) : (
                <ArchiveIcon /* style={{ color: props.cardColor }} */ />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete this event" arrow>
            <IconButton
              /* disableRipple
              disableFocusRipple
              disableTouchRipple */
              className={css(styles.iconEffectDelete)}
              id={"event-delete-button-" + props.id}
              aria-label="delete event"
              onClick={() => {
                setEventToDelete(props.title);
                setOpenDeleteDialog(true);
              }}
            >
              <DeleteIcon fontSize="inherit" color="error" />
            </IconButton>
          </Tooltip>
          <Button
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => {
              setExpanded(!expanded);
            }}
            id={"event-expand-button-" + props.id}
            aria-expanded={expanded}
            aria-label="show more"
            color="default"
            style={{ backgroundColor: props.cardColor }}
            variant="contained"
            size="small"
          >
            {expanded ? "Less" : "More"}
          </Button>
        </CardActions>
      </Card>
      <DeleteConfirmationDialog
        type="Event"
        name={eventToDelete}
        open={openDeleteDialog}
        handleClose={handleDeleteDialogClose}
      />
    </div>
  );
};
