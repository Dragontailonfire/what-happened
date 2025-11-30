import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import * as eventActions from "../redux/actions/eventItemActions";
import * as appActions from "../redux/actions/appSettingsActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import AddTagForm from "./common/AddTagForm";
import Box from "@mui/material/Box";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditRounded";
import DoneIcon from "@mui/icons-material/DoneRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineRounded";
import LabelIcon from "@mui/icons-material/LabelTwoTone";
import { green } from "@mui/material/colors";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteConfirmationDialog from "./common/DeleteConfirmationDialog";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const swing = keyframes`
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;



export default function EventTagList() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSelector((state) => state.appSettings);
  const [selectedTags, setSelectedTags] = useState(settings.filters);
  const [editMode, setEditMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tagToDelete, setTagToDelete] = useState("");
  const eventTagOptions = useSelector((state) => state.eventTags);

  useEffect(() => {
    dispatch(appActions.changeAppFilter({ filters: selectedTags }));
  }, [dispatch, selectedTags]);

  const handleDeleteDialogClose = (event) => {
    if (event.target.textContent === "Delete") {
      setSelectedTags((chips) =>
        chips.filter((chip) => chip.tagName !== tagToDelete)
      );
      dispatch(eventActions.deleteEventTag({ tagName: tagToDelete }));
      enqueueSnackbar("Tag '" + tagToDelete + "' is deleted!", {
        variant: "success",
      });
    }
    setOpenDeleteDialog(false);

    setTagToDelete("");
  };

  const handleListItemClick = (event, tag, colour) => {
    let filterNotAdded = true;
    selectedTags.forEach((element) => {
      if (element.tagName === tag) {
        filterNotAdded = false;
      }
    });
    if (filterNotAdded) {
      setSelectedTags([...selectedTags, { tagName: tag, colour: colour }]);
    }
  };
  const handleClearFilterChip = (chipToClear) => () => {
    setSelectedTags((chips) =>
      chips.filter((chip) => chip.tagName !== chipToClear)
    );
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
      <List component="div" aria-label="filters">
        <ListItem
          button={selectedTags.length > 0}
          onClick={() => {
            setEditMode(false);
            setSelectedTags([]);
          }}
        >
          {selectedTags.length > 0 ? (
            <ListItemText
              style={{ color: "#e8123c" }}
              primary="CLEAR FILTERS"
            />
          ) : eventTagOptions.length > 0 ? (
            <ListItemText primary="Filter by Tags" />
          ) : (
            <ListItemText primary="Tags" />
          )}

          <ListItemSecondaryAction>
            <IconButton
              sx={{
                "&:hover": {
                  animation: `${swing} 0.7s`,
                  backgroundColor: "transparent",
                },
              }}
              edge="end"
              onClick={() => {
                setEditMode(!editMode);
              }}
              aria-label="manageTags"
            >
              {editMode && eventTagOptions.length > 0 ? (
                <DoneIcon htmlColor={green["A700"]} />
              ) : eventTagOptions.length > 0 ? (
                <EditIcon />
              ) : (
                <></>
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <List component="div" aria-label="tag list">
        {eventTagOptions.map((opt) => (
          <ListItem
            alignItems="center"
            button
            dense
            key={opt.tagName}
            onClick={(event) => {
              setEditMode(false);

              handleListItemClick(event, opt.tagName, opt.colour);
            }}
          >
            <ListItemIcon>
              {selectedTags.find((tag) => tag.tagName === opt.tagName) ? (
                <></>
              ) : (
                <LabelIcon htmlColor={opt.colour} />
              )}
            </ListItemIcon>

            {selectedTags.find((tag) => tag.tagName === opt.tagName) ? (
              <Chip
                style={{ backgroundColor: opt.colour }}
                onDelete={handleClearFilterChip(opt.tagName)}
                label={opt.tagName}
              />
            ) : (
              <ListItemText primary={opt.tagName} />
            )}

            {editMode && (
              <ListItemSecondaryAction
                onClick={() => {
                  setTagToDelete(opt.tagName);
                  setOpenDeleteDialog(true);
                }}
              >
                <IconButton
                  sx={{
                    animation: `${pulse} 1s infinite`,
                  }}
                  edge="end"
                  aria-label="delete Tag"
                >
                  <DeleteOutlineIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
      <AddTagForm />
      <DeleteConfirmationDialog
        type="Tag"
        name={tagToDelete}
        open={openDeleteDialog}
        handleClose={handleDeleteDialogClose}
      />
    </Box>
  );
}

/* <ListItem
          onClick={() => {
            setEditMode(false);
          }}
        ></ListItem> */
