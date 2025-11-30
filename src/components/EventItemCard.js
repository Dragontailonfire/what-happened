import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import * as eventActions from "../redux/actions/eventItemActions";
import clsx from "clsx";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArchiveIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveSharpIcon from "@mui/icons-material/UnarchiveTwoTone";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import EditIcon from "@mui/icons-material/EditTwoTone";
import FavouriteIcon from "@mui/icons-material/FavoriteTwoTone";
import DoneIcon from "@mui/icons-material/DoneRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreRounded";
import LabelIcon from "@mui/icons-material/LabelRounded";

import PinIcon from "@mui/icons-material/RoomTwoTone";
import { pink, green } from "@mui/material/colors";
import _ from "lodash";
import DeleteConfirmationDialog from "./common/DeleteConfirmationDialog";
import { keyframes } from "@emotion/react";

const jello = keyframes`
  from, 11.1%, to { transform: translate3d(0, 0, 0); }
  22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }
  33.3% { transform: skewX(6.25deg) skewY(6.25deg); }
  44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }
  55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }
  66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }
  77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); }
  88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }
`;

const swing = keyframes`
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const flip = keyframes`
  from { transform: perspective(400px) rotate3d(0, 1, 0, -360deg); animation-timing-function: ease-out; }
  40% { transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg); animation-timing-function: ease-out; }
  50% { transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg); animation-timing-function: ease-in; }
  80% { transform: perspective(400px) scale3d(.95, .95, .95); animation-timing-function: ease-in; }
  to { transform: perspective(400px); animation-timing-function: ease-in; }
`;

const bounceOut = keyframes`
  20% { transform: scale3d(.9, .9, .9); }
  50%, 55% { opacity: 1; transform: scale3d(1.1, 1.1, 1.1); }
  to { opacity: 0; transform: scale3d(.3, .3, .3); }
`;

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
        sx={{
          transition: "0.1s",
          padding: -30,
          transform: expanded ? "scale(1.07)" : "none",
        }}
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
              sx={{
                "&:hover": {
                  animation: `${swing} 0.7s`,
                  backgroundColor: "transparent",
                },
              }}
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
              sx={{
                "&:hover": {
                  animation: `${jello} 0.7s 2`,
                  backgroundColor: "transparent",
                },
              }}
              aria-label="favourite event"
              onClick={handleFavouriteClick}
            >
              {props.favourite ? (
                <FavouriteIcon
                  fontSize="large"
                  sx={{ color: pink["A400"] }}
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
              sx={{
                "&:hover": {
                  animation: `${flip} 0.7s`,
                  backgroundColor: "transparent",
                },
              }}
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
              sx={{
                "&:hover": {
                  animation: `${bounceOut} 0.7s`,
                  backgroundColor: "transparent",
                },
              }}
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
          <Typography sx={{ marginLeft: "auto" }}>
            {props.tags.map((tag) => (
              <Tooltip key={tag.tagName} title={tag.tagName} arrow interactive>
                <LabelIcon htmlColor={tag.colour} fontSize="large" />
              </Tooltip>
            ))}
          </Typography>

          <IconButton
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: (theme) => theme.transitions.create("transform", {
                duration: theme.transitions.duration.short,
              }),
            }}
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
