import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppThemeToggler from "./common/appThemeToggler";
import IconButton from "@mui/material/IconButton";
import MainLogo from "@mui/icons-material/DashboardTwoTone";
import { Slide, Button, Container, Box } from "@mui/material";
import NotificationPopup from "./common/NotificationPopup";
import LoginDialog from "./common/LoginDialog";

export default function NavBar(props) {
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
              <Typography sx={{ marginLeft: "auto" }} component="div">
                <NotificationPopup />
                <AppThemeToggler />
                <Button
                  variant="contained"
                  sx={{
                    color: (theme) => theme.palette.primary.contrastText,
                    backgroundColor: (theme) => theme.palette.primary.light,
                  }}
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
      <Box sx={{ ...theme => theme.mixins.toolbar }} />
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
