import { createMuiTheme } from "@material-ui/core/styles";
import {
  red,
  common,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  grey,
  blueGrey,
  brown,
} from "@material-ui/core/colors";
import { applicationFonts } from "./constants";

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
    borderRadius: 30,
  },

  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        //textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        //borderRadius: 25,
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
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
      outlined: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        //borderRadius: 25,
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
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
      text: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        //borderRadius: 25,
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
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiIconButton: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiToggleButton: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiFab: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
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
    fontFamily: applicationFonts.join(","),
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      //main: "#4cba71",
      main: "#9745ff",
      //main: "#6930b2",
      //main: deepPurple[900],
    },
    secondary: {
      //main: "#9745ff",
      main: "#4cba71",
      //main: lightGreen[900],
    },
    text: {
      primary: blue[50],
    },

    //background: { default: blueGrey["A400"], paper: blueGrey[800] },
    //background: { default: common["black"], paper: blueGrey[900] },
    //background: { default: "#000a12", paper: blueGrey[900] },
    //background: { default: brown[900], paper: brown[800] },
    background: { default: blueGrey[900], paper: blueGrey[800] },
    //background: { default: "#101010", paper: "#141414" },
    //background: { default: "#091115", paper: "#102027" },
  },
  shape: {
    borderRadius: 20,
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        //textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        //borderRadius: 25,
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
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
      outlined: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        //borderRadius: 25,
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
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
      text: {
        textTransform: "none",
        //background: "linear-gradient(45deg, #FE6B8B 30%, #9745ff 90%)",
        //borderRadius: 25,
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
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiIconButton: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiToggleButton: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiFab: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
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
        borderRadius: 0,
        //background: "linear-gradient(45deg, #45ff97 20%, #9745ff 90%)",
        //background: blueGrey[900],
        //borderColor: blueGrey[900],
        //disableUnderline: true,
      },
    },
  },
  typography: {
    fontFamily: applicationFonts.join(","),
  },
});

export const amoledTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepPurple[900],
    },
    secondary: {
      main: teal["A400"],
    },
    text: {
      primary: blue[50],
    },
    background: { default: common["black"], paper: common["black"] },
    //background: { default: "#101010", paper: "#141414" },
  },
  shape: {
    borderRadius: 30,
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        borderColor: "#4cba71",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
        },
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
      outlined: {
        textTransform: "none",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
          border: "3px solid",
        },
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
      text: {
        textTransform: "none",
        borderColor: "#4cba71",
        "&:hover": {
          "& $label": {
            transform: "scale(1.2)",
          },
        },
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiIconButton: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiToggleButton: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiFab: {
      root: {
        outline: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: applicationFonts.join(","),
  },
});
