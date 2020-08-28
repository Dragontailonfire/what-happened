import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppThemeToggler from "./common/appThemeToggler";
import IconButton from "@material-ui/core/IconButton";
import MainLogo from "@material-ui/icons/EventNoteTwoTone";
import { Slide, Button, Container } from "@material-ui/core";
import NotificationPopup from "./common/NotificationPopup";
import LoginDialog from "./common/LoginDialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  navBarButton: {
    marginLeft: "auto",
  },
  loginButton: {
    //marginLeft: -10,
    //color: theme.palette.primary.contrastText,
    //backgroundColor: theme.palette.primary.light,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
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
        <AppBar color="inherit" position="fixed" elevation={trigger ? 10 : 0}>
          <Container maxWidth="lg">
            <Toolbar variant="regular">
              <Link to="/">
                <IconButton color="primary">
                  <MainLogo fontSize={isSmallScreen ? "small" : "default"} />
                </IconButton>
              </Link>
              <Typography variant="h6">
                {isSmallScreen ? "W H?" : "WHAT HAPPENED?"}
              </Typography>
              <Typography className={classes.navBarButton}>
                <NotificationPopup />
                <AppThemeToggler />
                <Button
                  variant="contained"
                  size={isSmallScreen ? "small" : "medium"}
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
