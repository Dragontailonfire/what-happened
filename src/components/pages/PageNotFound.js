import React from "react";
import { Link } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import NavBar from "../Navbar";
import SiteFooter from "../SiteFooter";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <ThemeProvider theme>
      <CssBaseline />
      <NavBar />
      <div className={classes.offset} />
      <Container maxWidth="lg">
        <Typography variant="h1">Nothing to see here folks!</Typography>
        <Typography variant="h6" gutterBottom>
          How did you end up here?
        </Typography>
        <Typography variant="button">
          <Link to="/" className="btn">
            <Button color="primary" variant="contained" size="large">
              Go home
            </Button>
          </Link>
        </Typography>
      </Container>
      <SiteFooter />
    </ThemeProvider>
  );
}
