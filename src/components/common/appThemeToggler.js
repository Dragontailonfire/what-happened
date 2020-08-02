import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as appActions from "../../redux/actions/appSettingsActions";
import { Tooltip, IconButton, makeStyles } from "@material-ui/core";
import LightModeIcon from "@material-ui/icons/WbSunnyTwoTone";
import DarkModeIcon from "@material-ui/icons/NightsStayTwoTone";

const useStyles = makeStyles((theme) => ({
  iconEffect: {
    marginRight: theme.spacing(1),
    transition: "0.1s",
    "&:hover": {
      //backgroundColor: "transparent",
    },
  },
}));

const AppThemeToggler = () => {
  const settings = useSelector((state) => state.appSettings);
  const dispatch = useDispatch();
  const currentTheme = settings.isDark;
  const newTheme = { isDark: !currentTheme };
  const classes = useStyles();

  return (
    <Tooltip title={"Toggle light/dark mode"} arrow enterDelay={500}>
      <IconButton
        /* disableFocusRipple
        disableRipple
        disableTouchRipple */
        //className={css(styles.iconEffect)}
        className={classes.iconEffect}
        color="inherit"
        onClick={() => {
          dispatch(appActions.toggleAppTheme(newTheme));
        }}
      >
        {currentTheme ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default AppThemeToggler;
