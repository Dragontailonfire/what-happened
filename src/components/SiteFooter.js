import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as appActions from "../redux/actions/appSettingsActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { Paper, Button, Grid } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" gutterBottom>
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
    minHeight: "calc(100vh - 330px)",
  },
  footer: {
    display: "flex",
    padding: theme.spacing(1),
    marginTop: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SiteFooter() {
  const classes = useStyles();
  const settings = useSelector((state) => state.appSettings);
  const dispatch = useDispatch();
  const currentTheme = settings.isAmoled;
  const newTheme = { isAmoled: !currentTheme };

  return (
    <div id="bottom-anchor" className={classes.root}>
      <div className={classes.footer}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                <RouterLink to="/about">About</RouterLink>
                {" | "}
                <RouterLink to="/random">Random Page</RouterLink>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="overline">
                Keep track of all the Events in your life!
              </Typography>
            </Grid>

            <Grid item>
              <Copyright />
            </Grid>
            <Grid item>
              <ToggleButton
                value="theme change"
                selected={currentTheme}
                onChange={() => {
                  dispatch(appActions.toggleAppTheme(newTheme));
                }}
              >
                {currentTheme
                  ? "Take me to the light"
                  : "Embrace the darkness"}
              </ToggleButton>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
