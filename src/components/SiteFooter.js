import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { Paper } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Dragontailonfire">
        Dragontailonfire
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    //minHeight: "70vh",
    minHeight: "calc(100vh - 280px)",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    //backgroundColor: theme.palette.background.paper,
  },
}));

export default function SiteFooter() {
  const classes = useStyles();

  return (
    <div id="bottom-anchor" className={classes.root}>
      <Paper className={classes.footer} elevation={24}>
        <Container maxWidth="lg">
          <Typography variant="overline">
            Keep track of all the Events in your life!
          </Typography>
          <Typography variant="subtitle1">
            <RouterLink to="/about">About Us</RouterLink>
            {" | "}
            <RouterLink to="/random">Random Page</RouterLink>
          </Typography>

          <Copyright />
        </Container>
      </Paper>
    </div>
  );
}
