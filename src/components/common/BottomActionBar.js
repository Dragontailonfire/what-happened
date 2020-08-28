import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Button } from "@material-ui/core";
import AddEventDialog from "./AddEventDialog";
import ManageFilterDialog from "./ManageFilterDialog";
import ChangeViewDialog from "./ChangeViewDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 500,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

export default function BottomActionBar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
  const [openChangeViewDialog, setOpenChangeViewDialog] = useState(false);
  const [openFlterEventDialog, setOpenFilterEventDialog] = useState(false);

  const handleAddEventDialogClose = () => {
    setOpenAddEventDialog(false);
  };
  const handleChangeViewDialogClose = () => {
    setOpenChangeViewDialog(false);
  };
  const handleFilterEventDialogClose = () => {
    setOpenFilterEventDialog(false);
  };

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <Button
          variant="text"
          size="small"
          onClick={() => {
            setOpenAddEventDialog(true);
          }}
        >
          ADD EVENT
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            setOpenChangeViewDialog(true);
          }}
        >
          FILTER VIEWS
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            setOpenFilterEventDialog(true);
          }}
        >
          APPLY TAGS
        </Button>
        {/* <BottomNavigationAction label="VIEWS" />
        <BottomNavigationAction label="TAGS" /> */}
      </BottomNavigation>
      <AddEventDialog
        open={openAddEventDialog}
        handleClose={handleAddEventDialogClose}
      />
      <ChangeViewDialog
        open={openChangeViewDialog}
        handleClose={handleChangeViewDialogClose}
      />
      <ManageFilterDialog
        open={openFlterEventDialog}
        handleClose={handleFilterEventDialogClose}
      />
    </>
  );
}
