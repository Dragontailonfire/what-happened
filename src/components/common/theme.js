import { createMuiTheme } from "@material-ui/core/styles";
import { common, grey, blueGrey } from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#4cba71",
      //main: "#9745ff",
    },
    secondary: {
      main: "#9745ff",
      //main: "#4cba71",
    },
    background: { default: grey[200], paper: common["white"] }, //common["white"]
  },

  props: {
    MuiIconButton: {
      disableFocusRipple: false,
      disableRipple: false,
    },
    MuiButton: {
      disableElevation: false,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 0,
        //color: "black",
        //padding: "0 30px",
      },
      text: {
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 0,
        //color: "black",
        //padding: "0 30px",
      },
    },
    MuiCard: {
      root: { borderRadius: 0 },
    },
    MuiPaper: {
      root: { borderRadius: 0 },
    },
    MuiTextField: {
      root: {
        borderRadius: 0,
        //background: "linear-gradient(45deg, #45ff97 20%, #9745ff 90%)",
        background: grey[300],
        disableUnderline: false,
      },
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#4cba71",
      //main: "#9745ff",
    },
    secondary: {
      main: "#9745ff",
      //main: "#4cba71",
    },
    //background: { default: grey["A400"], paper: grey[800] },
    background: { default: blueGrey[900], paper: blueGrey[800] },
  },
  props: {
    MuiIconButton: {
      disableFocusRipple: false,
      disableRipple: false,
    },
    MuiButton: {
      disableElevation: false,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 0,
        //color: "black",
        //padding: "0 30px",
      },
      text: {
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 0,
        //color: "black",
        //padding: "0 30px",
      },
    },
    MuiCard: {
      root: { borderRadius: 0 },
    },
    MuiPaper: {
      root: { borderRadius: 0 },
    },
    MuiTextField: {
      root: {
        borderRadius: 0,
        //background: "linear-gradient(45deg, #45ff97 20%, #9745ff 90%)",
        background: blueGrey[800],
        disableUnderline: false,
      },
    },
  },
});

/* const colours = {
  primary: [{ light: amber, dark: amber }],"#003366"
  secondary: [{ light: amber, dark: amber }],
  background: { default: common["black"], paper: grey[900] },
}; */
