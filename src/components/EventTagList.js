import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import * as eventActions from "../redux/actions/eventItemActions";
import * as appActions from "../redux/actions/appSettingsActions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import AddTagForm from "./common/AddTagForm";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/SettingsTwoTone";
import DoneIcon from "@material-ui/icons/DoneRounded";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutlineRounded";
import LabelIcon from "@material-ui/icons/Label";
import { green } from "@material-ui/core/colors";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteConfirmationDialog from "./common/DeleteConfirmationDialog";
import { StyleSheet, css } from "aphrodite";
import swing from "react-animations/lib/swing";
import pulse from "react-animations/lib/pulse";
import { Button, Collapse } from "@material-ui/core";

const styles = StyleSheet.create({
  iconEffectDelete: {
    animationName: pulse,
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
  iconEffectEdit: {
    ":hover": {
      animationName: swing,
      animationDuration: "0.7s",
      //backgroundColor: "transparent",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    maxHeight: "100px",
  },
}));

export default function EventTagList() {
  const dispatch = useDispatch();
  const classes = useStyles();
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
    if (eventTagOptions.length < 2) {
      setEditMode(!editMode);
    }
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
    <div className={classes.roota}>
      <List component="div" aria-label="tag list">
        <ListItem
        //button={selectedTags.length > 0}
        >
          {selectedTags.length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              style={{ backgroundColor: "#e8123c" }}
              onClick={() => {
                setEditMode(false);
                setSelectedTags([]);
              }}
            >
              CLEAR TAGS
            </Button>
          ) : eventTagOptions.length > 0 ? (
            <ListItemText primary="Filter by Tags" />
          ) : (
            <ListItemText primary="Tags" />
          )}

          <ListItemSecondaryAction>
            <IconButton
              className={css(styles.iconEffectEdit)}
              edge="end"
              onClick={() => {
                setEditMode(!editMode);
              }}
              aria-label="manageTags"
            >
              {editMode && eventTagOptions.length > 0 ? (
                <DoneIcon htmlColor={green["A700"]} />
              ) : (
                <EditIcon />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {eventTagOptions.map((opt) => (
          <ListItem
            alignItems="center"
            button={!selectedTags.find((tag) => tag.tagName === opt.tagName)}
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
                style={{ backgroundColor: opt.colour, color: "#fff" }}
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
                  className={css(styles.iconEffectDelete)}
                  edge="end"
                  aria-label="delete Tag"
                >
                  <DeleteOutlineIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
        <Collapse in={editMode}>
          <ListItem>
            <AddTagForm />
          </ListItem>
        </Collapse>
      </List>

      <DeleteConfirmationDialog
        type="Tag"
        name={tagToDelete}
        open={openDeleteDialog}
        handleClose={handleDeleteDialogClose}
      />
    </div>
  );
}
