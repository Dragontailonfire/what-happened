import React from "react";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  Container,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavBar from "../Navbar";
import SiteFooter from "../SiteFooter";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <NavBar />
      <div className={classes.offset} />
      <Container maxWidth="lg">
        <h1>Nothing to see here!</h1>
        <p>How did you end up here?</p>
        <Link to="/" className="btn">
          <Button color="primary" variant="contained" size="large">
            Go home
          </Button>
        </Link>
      </Container>
      <SiteFooter />
    </>
  );
}
