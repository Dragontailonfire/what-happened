import * as types from "../actions/actionTypes";
import _ from "lodash";
import {
  red,
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
} from "@material-ui/core/colors";

export default function eventTagsReducer(state = defaultEventTagsA1, action) {
  switch (action.type) {
    case types.CREATE_EVENT_TAG:
      // sample = pick random item from array
      return [
        ...state,
        { ...action.eventTag, colour: _.sample(colourLibraryA7) },
      ];
    case types.DELETE_EVENT_TAG:
      return state.filter(
        (eventTag) => eventTag.tagName !== action.eventTag.tagName
      );
    default:
      return state;
  }
}

const defaultEventTags = [
  { tagName: "Birthdays", colour: "#236fed" },
  { tagName: "Work", colour: "#e8123c" },
  { tagName: "Vehicle", colour: "#8c7219" },
  { tagName: "Insurance", colour: "#3d8180" },
  { tagName: "Neudesic", colour: "#e03400" },
  { tagName: "CTS", colour: "#885cd3" },
  { tagName: "Health", colour: "#4d67fc" },
  { tagName: "Fitness", colour: "#217ea8" },
  { tagName: "MutualFunds", colour: "#398700" },
  { tagName: "Finance", colour: "#737a18" },
  { tagName: "Devices", colour: "#ce4700" },
  { tagName: "Important", colour: "#ea0049" },
  { tagName: "Personal", colour: "#c500e8" },
  { tagName: "To Do", colour: "#038468" },
  { tagName: "Learning", colour: "#7a7a00" },
];

const defaultEventTagsA1 = [
  { tagName: "Birthdays", colour: red["A700"] },
  { tagName: "Work", colour: pink["A700"] },
  { tagName: "Vehicle", colour: purple["A700"] },
  { tagName: "Insurance", colour: deepPurple["A700"] },
  { tagName: "Neudesic", colour: indigo["A700"] },
  { tagName: "CTS", colour: blue["A700"] },
  { tagName: "Health", colour: lightBlue["A700"] },
  { tagName: "Fitness", colour: cyan["A700"] },
  { tagName: "MutualFunds", colour: teal["A700"] },
  { tagName: "Finance", colour: green["A700"] },
  { tagName: "Devices", colour: lightGreen["A700"] },
  { tagName: "Important", colour: lime["A700"] },
  { tagName: "Personal", colour: yellow["A700"] },
  { tagName: "To Do", colour: amber["A700"] },
  { tagName: "Learning", colour: orange["A700"] },
];
const colourLibraryA1 = [
  red["A100"],
  pink["A100"],
  purple["A100"],
  deepPurple["A100"],
  indigo["A100"],
  blue["A100"],
  lightBlue["A100"],
  cyan["A100"],
  teal["A100"],
  green["A100"],
  lightGreen["A100"],
  lime["A100"],
  yellow["A100"],
  amber["A100"],
  orange["A100"],
  deepOrange["A100"],
];

const colourLibrary = [
  "#236fed",
  "#e8123c",
  "#8c7219",
  "#3d8180",
  "#e03400",
  "#885cd3",
  "#4d67fc",
  "#217ea8",
  "#398700",
  "#737a18",
  "#ce4700",
  "#ea0049",
  "#c500e8",
  "#038468",
  "#7a7a00",
];
const colourLibraryA4 = [
  red["A400"],
  pink["A400"],
  purple["A400"],
  deepPurple["A400"],
  indigo["A400"],
  blue["A400"],
  lightBlue["A400"],
  cyan["A400"],
  teal["A400"],
  green["A400"],
  lightGreen["A400"],
  lime["A400"],
  yellow["A400"],
  amber["A400"],
  orange["A400"],
  deepOrange["A400"],
];

const colourLibraryA7 = [
  red["A700"],
  pink["A700"],
  purple["A700"],
  deepPurple["A700"],
  indigo["A700"],
  blue["A700"],
  lightBlue["A700"],
  cyan["A700"],
  teal["A700"],
  green["A700"],
  lightGreen["A700"],
  lime["A700"],
  yellow["A700"],
  amber["A700"],
  orange["A700"],
  deepOrange["A700"],
];
