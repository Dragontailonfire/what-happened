import { createMuiTheme } from "@material-ui/core/styles";
import {
  common,
  grey,
  blueGrey,
  purple,
  red,
  cyan,
  blue,
  yellow,
} from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      //main: "#4cba71",
      main: "#9745ff",
      //main: blue[900],
    },
    secondary: {
      //main: "#9745ff",
      main: "#4cba71",
      //main: yellow[900],
    },
    //background: { default: grey[100], paper: common["white"] }, //common["white"]
  },
  shape: {
    borderRadius: 5,
  },

  props: {
    MuiIconButton: {
      disableFocusRipple: false,
      disableRipple: false,
    },
    MuiButton: {
      //disableElevation: true,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 5,
        borderColor: "#4cba71", //common["black"],
        //border: "3px solid",
        //color: "black",
        //padding: "0 30px",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
          /* borderColor: "#4cba71", //common["black"],
          border: "5px solid", */
        },
      },
      outlined: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 5,
        //borderColor: "#4cba71", //common["black"],

        //color: "black",
        //padding: "0 30px",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
          border: "3px solid",
          /* borderColor: "#4cba71", //common["black"],
          border: "5px solid", */
        },
      },
      text: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 5,
        borderColor: "#4cba71", //common["black"],
        //border: "2px solid",
        //color: "black",
        //padding: "0 30px",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
          /* borderColor: "#4cba71", //common["black"],
          border: "5px solid", */
        },
      },
    },
    MuiCard: {
      //root: { borderRadius: 0 },
    },
    MuiPaper: {
      //root: { borderRadius: 0 },
    },
    /* MuiTextField: {
      root: {
        "& input:valid + fieldset": {
          borderColor: grey[200],
          borderWidth: 2,
        },
        "& input:invalid + fieldset": {
          borderColor: "red",
          borderWidth: 2,
        },
        "& input:valid:focus + fieldset": {
          borderLeftWidth: 10,
          padding: "4px !important", // override inline-style
        },
        borderRadius: 5,
        //background: "linear-gradient(45deg, #45ff97 20%, #9745ff 90%)",
        background: grey[200],
        //borderColor:grey[200],
        //disableUnderline: false,
      },
    }, */
  },
  typography: {
    fontFamily: ["Open Sans", "Roboto", "Ubuntu", "Helvetica"].join(","),
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      //main: "#4cba71",
      //main: "#9745ff",
      main: blue[900],
    },
    secondary: {
      //main: "#9745ff",
      //main: "#4cba71",
      main: yellow[900],
    },
    text: {
      primary: blue[50],
    },

    //background: { default: grey["A400"], paper: grey[800] },
    //background: { default: common["black"], paper: blueGrey[900] },
    //background: { default: "#000a12", paper: blueGrey[900] },
    background: { default: blueGrey[900], paper: blueGrey[800] },
  },
  shape: {
    borderRadius: 5,
  },
  props: {
    MuiIconButton: {
      disableFocusRipple: false,
      disableRipple: false,
    },
    MuiButton: {
      //disableElevation: true,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 5,
        borderColor: "#4cba71", //common["black"],
        //border: "3px solid",
        //color: "black",
        //padding: "0 30px",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
          /* borderColor: "#4cba71", //common["black"],
          border: "5px solid", */
        },
      },
      outlined: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 5,
        //borderColor: "#4cba71", //common["black"],
        //color: "black",
        //padding: "0 30px",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
          border: "3px solid",
          /* borderColor: "#4cba71", //common["black"],
          border: "5px solid", */
        },
      },
      text: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        borderRadius: 5,
        borderColor: "#4cba71", //common["black"],
        //border: "2px solid",
        //color: "black",
        //padding: "0 30px",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
          /* borderColor: "#4cba71", //common["black"],
          border: "5px solid", */
        },
      },
    },
    MuiCard: {
      //root: { borderRadius: 0 },
    },
    MuiPaper: {
      //root: { borderRadius: 0 },
    },
    MuiTextField: {
      root: {
        /* "& input:valid + fieldset": {
          borderColor: blueGrey[900],
          borderWidth: 2,
        },
        "& input:invalid + fieldset": {
          borderColor: "red",
          borderWidth: 2,
        },
        "& input:valid:focus + fieldset": {
          borderLeftWidth: 10,
          padding: "4px !important", // override inline-style
        }, */
        //borderRadius: 5,
        //background: "linear-gradient(45deg, #45ff97 20%, #9745ff 90%)",
        //background: blueGrey[900],
        //borderColor: blueGrey[900],
        //disableUnderline: true,
      },
    },
  },
  typography: {
    fontFamily: ["Open Sans", "Roboto", "Ubuntu", "Helvetica"].join(","),
  },
});

/* const colours = {
  primary: [{ light: amber, dark: amber }],"#003366"
  secondary: [{ light: amber, dark: amber }],
  background: { default: common["black"], paper: grey[900] },
}; */
