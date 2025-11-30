import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

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
    //minHeight: "20vh",
    minHeight: "calc(100vh - 280px)",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SiteFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
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
      </footer>
    </div>
  );
}
