import React from "react";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  Container,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import MainLogo from "@material-ui/icons/EventNoteTwoTone";
import AppThemeToggler from "./appThemeToggler";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  navBarButton: {
    marginLeft: "auto",
  },
}));

export default function BasicNavbar() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar color="inherit" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar variant="regular">
            <Link to="/">
              <IconButton color="primary">
                <MainLogo />
              </IconButton>
            </Link>
            <Typography variant="h6">WHAT HAPPENED?</Typography>
            <Typography className={classes.navBarButton}>
              <AppThemeToggler />
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.offset} />
      <div className={classes.offset} />
    </>
  );
}
