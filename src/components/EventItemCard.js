import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArchiveIcon from "@material-ui/icons/ArchiveRounded";
import UnarchiveSharpIcon from "@material-ui/icons/UnarchiveRounded";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import EditIcon from "@material-ui/icons/EditRounded";
import FavouriteIcon from "@material-ui/icons/FavoriteRounded";
import DoneIcon from "@material-ui/icons/DoneRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import LabelIcon from "@material-ui/icons/FiberManualRecord";
import {
  pink,
  green,
  red,
  yellow,
  common,
  grey,
} from "@material-ui/core/colors";
import _ from "lodash";
import DeleteConfirmationDialog from "./common/DeleteConfirmationDialog";
import { StyleSheet, css } from "aphrodite";
import jello from "react-animations/lib/jello";
import swing from "react-animations/lib/swing";
import fadeOutDown from "react-animations/lib/fadeOutDown";
import fadeOutUp from "react-animations/lib/fadeOutUp";
import flip from "react-animations/lib/flip";
import zoomOut from "react-animations/lib/zoomOut";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    //borderRadius: 15,
    //borderTopLeftRadius: 0,
    //borderBottomLeftRadius: 0,
    //borderColor: "#9745ff",
    //borderRight: "5px solid",
    //borderLeft: "5px solid",
    //border: "5px solid",

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
  primaryBackground: {
    padding: theme.spacing(2.5),
    /* boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.19), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", */
    //transform: "scale(1.07)",
    //borderRadius: 20,
    //backgroundColor: theme.palette.primary.dark,
    //color: theme.palette.common.black,
  },

  bodyBackground: {
    padding: theme.spacing(2.5),
    //border: "15px solid",
    //borderColor: theme.palette.background.paper,
    //backgroundColor: theme.palette.background.default,
    boxShadow:
      "0 1px 10px 0 rgba(0, 0, 0, 0.19), 0 1px 10px 0 rgba(0, 0, 0, 0.19)",
  },
  actionsBackground: {
    padding: theme.spacing(1.5),
    /* backgroundColor: theme.palette.background.paper */
  },
  expand: {
    //transform: "rotate(0deg)",
    marginLeft: "auto",
    /* marginRight: -9,
    marginBottom: -8, */
    //borderRadius: 25,
    //marginTop: -10,
    "&:hover": {
      //transform: "translateY(-10px)",
      //transform: "scale(1.01)",
    },
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  tags: { marginLeft: "auto" },
  selectedFavouriteIcon: {
    backgroundColor: theme.palette.background.paper,
  },
  tagDisplay: {
    marginRight: -10,
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
      animationName: zoomOut,
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
  iconEffectExpand: {
    ":hover": {
      animationName: fadeOutDown,
      animationDuration: "0.7s",
    },
  },
  iconEffectCollapse: {
    //":hover": {
    animationName: fadeOutUp,
    animationIterationCount: "3",
    animationDuration: "0.7s",
    //},
  },
});

export const EventItemCard = (props) => {
  const settings = useSelector((state) => state.appSettings);
  const dispatch = useDispatch();
  const amoledOn = settings.isAmoled;
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
      <Card
        //square
        id={"event-item-" + props.id}
        //className={classes.root}
        className={clsx(classes.root, {
          [classes.editMode]: expanded,
        })}
        variant={amoledOn ? "outlined" : "elevation"}
        elevation={expanded ? 10 : 0}
        style={
          {
            //borderColor: props.cardColor,
            /* backgroundColor: props.cardColor, */
            /* boxShadow: "5px 5px 1px" + props.cardColor, */
          }
        }
        //"0 4px 8px 0 " + props.cardColor + ", 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        //"0 2px 4px 0 " + props.cardColor +", 0 3px 10px 0 " + props.cardColor
        //"1px 1px 5px " + props.cardColor
        //"0 0 5px" + props.cardColor,
      >
        <CardHeader
          style={{
            backgroundColor: amoledOn ? common["black"] : props.cardColor,
            color: amoledOn ? common["white"] : common["black"],
          }}
          className={classes.primaryBackground}
          title={
            <Typography id={"event-title-" + props.id} variant="h5">
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
                /* disableRipple
                disableFocusRipple
                disableTouchRipple */
                hidden={props.archived}
                id={"event-favourite-button-" + props.id}
                className={classes.selectedFavouriteIcon}
                aria-label="favourite event"
                onClick={handleFavouriteClick}
              >
                {props.favourite ? (
                  <FavouriteIcon
                    fontSize="large"
                    htmlColor={pink["A400"]}
                    className={css(styles.iconEffect)}
                  />
                ) : (
                  <FavouriteIcon
                    className={css(styles.iconEffect)}
                    fontSize="small"
                    color="inherit"
                  />
                )}
              </IconButton>
            </Tooltip>
          }
          avatar={
            props.completedEvent && (
              <Avatar
                aria-label="done"
                style={{
                  border: "2px solid",
                  borderColor: green[900],
                  backgroundColor: green["A700"],
                }}
              >
                <DoneIcon fontSize="large" htmlColor={green[900]} />
              </Avatar>
            )
          }
          subheader={
            props.completedEvent && (
              <Typography
                variant="h6"
                id={"event-completed-duration-" + props.id}
              >
                {"Duration: " + props.detailedDuration}
              </Typography>
            )
          }
        />
        <CardContent className={classes.bodyBackground}>
          <Typography
            id={"event-duration-" + props.id}
            variant="h5"
            color="textSecondary"
            gutterBottom
            style={{ textTransform: "uppercase" }}
          >
            {"Happened " + props.duration}
          </Typography>
          <Typography gutterBottom>
            {props.tags.map((tag) =>
              expanded ? (
                <Chip
                  key={tag.tagName}
                  color="default"
                  size="small"
                  style={{
                    backgroundColor: tag.colour,
                    //color: "#000",
                    margin: "2px",
                  }}
                  label={tag.tagName}
                />
              ) : (
                <Tooltip
                  key={tag.tagName}
                  title={tag.tagName}
                  arrow
                  interactive
                >
                  <LabelIcon htmlColor={tag.colour} fontSize="small" />
                </Tooltip>
              )
            )}
          </Typography>
          <Collapse in={expanded} /* timeout="auto" unmountOnExit */>
            <Typography id={"event-description-" + props.id} variant="h6">
              {props.description}
            </Typography>
            <Typography variant="h6" id={"event-startdate-" + props.id}>
              {"Happened on " + new Date(props.startDate).toDateString()}
            </Typography>
            {props.completedEvent && (
              <Typography variant="h6" id={"event-enddate-" + props.id}>
                {"Ended on " + new Date(props.endDate).toDateString()}
              </Typography>
            )}
            <Typography
              id={"event-total-duration-" + props.id}
              gutterBottom
              variant="h6"
            >
              {"Event Duration: " + props.detailedDuration}
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
        <CardActions
          disableSpacing
          //className={classes.primaryBackgrounda}
          className={classes.actionsBackground}
          /* style={{
            backgroundColor: props.cardColor,
          }} */
        >
          <Tooltip title={props.edit ? "Editing..." : "Edit this event"} arrow>
            <IconButton
              /* disableRipple
              disableFocusRipple
              disableTouchRipple */
              hidden={props.archived}
              name="editEvent"
              id={"event-edit-button-" + props.id}
              aria-expanded={expanded}
              onClick={handleEditClick}
            >
              {props.edit ? (
                <EditIcon
                  fontSize="large"
                  className={css(styles.iconEffectEdit)}
                  color="secondary"
                />
              ) : (
                <EditIcon
                  fontSize="small"
                  className={css(styles.iconEffectEdit)}
                />
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
              /* disableRipple
              disableFocusRipple
              disableTouchRipple */

              id={"event-archive-button-" + props.id}
              onClick={handleArchiveClick}
              aria-label="archive event"
            >
              {props.archived ? (
                <UnarchiveSharpIcon
                  fontSize="large"
                  className={css(styles.iconEffectArchive)}
                  color="secondary"
                />
              ) : (
                <ArchiveIcon
                  className={css(
                    styles.iconEffectArchive
                  )} /* style={{ color: props.cardColor }} */
                />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete this event" arrow>
            <IconButton
              /* disableRipple
              disableFocusRipple
              disableTouchRipple */
              id={"event-delete-button-" + props.id}
              aria-label="delete event"
              onClick={() => {
                setEventToDelete(props.title);
                setOpenDeleteDialog(true);
              }}
            >
              <DeleteIcon
                className={css(styles.iconEffectDelete)}
                color="error"
              />
            </IconButton>
          </Tooltip>
          <Button
            disableElevation={false}
            className={classes.expand}
            onClick={() => {
              setExpanded(!expanded);
            }}
            id={"event-expand-button-" + props.id}
            aria-expanded={expanded}
            aria-label="show more"
            //color=""
            style={{
              backgroundColor: props.cardColor,
              color: common["black"],
            }}
            variant="contained"
            size="small"
          >
            {expanded ? (
              <ExpandLessIcon
                fontSize="large"
                className={css(styles.iconEffectCollapse)}
                /* className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })} */
              />
            ) : (
              <ExpandMoreIcon
                fontSize="large"
                className={css(styles.iconEffectExpand)}
                /* className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })} */
              />
            )}
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
