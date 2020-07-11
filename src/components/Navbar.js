import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppThemeToggler from "./common/appThemeToggler";
import IconButton from "@material-ui/core/IconButton";
import MainLogo from "@material-ui/icons/DashboardTwoTone";
import { Slide, Button, Container } from "@material-ui/core";
import NotificationPopup from "./common/NotificationPopup";
import LoginDialog from "./common/LoginDialog";

const useStyles = makeStyles((theme) => ({
  scrollButton: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  offset: theme.mixins.toolbar,
  navBarButton: { marginLeft: "auto" },
  loginButton: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar color="primary" position="fixed" elevation={trigger ? 10 : 0}>
          <Container maxWidth="lg">
            <Toolbar variant="regular">
              <Link to="/">
                <IconButton color="secondary">
                  <MainLogo />
                </IconButton>
              </Link>
              <Typography variant="h6">What Happened?</Typography>
              <Typography className={classes.navBarButton}>
                <NotificationPopup />
                <AppThemeToggler />
                <Button
                  variant="contained"
                  className={classes.loginButton}
                  color="primary"
                  onClick={() => {
                    setOpenLoginDialog(true);
                  }}
                >
                  LOGIN
                </Button>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
      <LoginDialog
        open={openLoginDialog}
        handleClose={handleLoginDialogClose}
      />
    </>
  );
}

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};
