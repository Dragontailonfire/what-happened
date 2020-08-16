import React from "react";
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
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

export default function AboutPage() {
  const classes = useStyles();
  return (
    <ThemeProvider theme>
      <CssBaseline />
      <NavBar />
      <div className={classes.offset} />
      <Container maxWidth="lg">
        <Typography variant="h1">
          About
        </Typography>
        <Typography variant="h6" gutterBottom>
          I am learning React!
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
