import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  makeStyles,
  Button,
} from "@material-ui/core";
import NavBar from "../Navbar";
import SiteFooter from "../SiteFooter";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

export default function AboutPage() {
  const classes = useStyles();
  return (
    <ThemeProvider>
      <CssBaseline />
      <NavBar />
      <div className={classes.offset} />
      <Container maxWidth="lg">
        <h1>About Us</h1>
        <p>
          This app uses React, Redux, React Router, and many other helpful
          libraries.
        </p>
        <Link to="/" className="btn">
          <Button color="primary" variant="contained" size="large">
            Go home
          </Button>
        </Link>
      </Container>
      <SiteFooter />
    </ThemeProvider>
  );
}
