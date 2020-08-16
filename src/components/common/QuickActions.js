import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import { Zoom, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddTwoTone";
import AddEventDialog from "./AddEventDialog";
import FilterListIcon from "@material-ui/icons/FilterListRounded";
import ManageFilterDialog from "./ManageFilterDialog";

const useStyles = makeStyles((theme) => ({
  scrollButton: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(2),
  },
  addButton: {
    position: "fixed",
    bottom: theme.spacing(12),
    right: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  filterButton: {
    position: "fixed",
    bottom: theme.spacing(21),
    right: theme.spacing(1.5),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

export default function QuickActions(props) {
  const classes = useStyles();
  const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
  const [openFlterEventDialog, setOpenFilterEventDialog] = useState(false);

  const handleAddEventDialogClose = () => {
    setOpenAddEventDialog(false);
  };
  const handleFilterEventDialogClose = () => {
    setOpenFilterEventDialog(false);
  };

  return (
    <>
      <div>
        <Fab
          hidden
          className={classes.filterButton}
          color="secondary"
          size="medium"
          aria-label="manage filters"
          onClick={() => {
            setOpenFilterEventDialog(true);
          }}
        >
          <FilterListIcon />
        </Fab>
        <Fab
          hidden
          className={classes.addButton}
          color="primary"
          size="large"
          variant="round"
          aria-label="add event"
          onClick={() => {
            setOpenAddEventDialog(true);
          }}
        >
          <AddIcon />
        </Fab>
        <ScrollTop {...props}>
          <Fab
            color="primary"
            size="small"
            aria-label="scroll back to top"
            elevation={15}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </div>
      <AddEventDialog
        open={openAddEventDialog}
        handleClose={handleAddEventDialogClose}
      />
      <ManageFilterDialog
        open={openFlterEventDialog}
        handleClose={handleFilterEventDialogClose}
      />
    </>
  );
}

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrollButton}
      >
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};
