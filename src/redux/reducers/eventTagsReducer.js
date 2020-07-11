import * as types from "../actions/actionTypes";
import _ from "lodash";

export default function eventTagsReducer(state = defaultEventTags, action) {
  switch (action.type) {
    case types.CREATE_EVENT_TAG:
      // sample = pick random item from array
      return [
        ...state,
        { ...action.eventTag, colour: _.sample(colourLibrary) },
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
  /* { tagName: "Neudesic", colour: "#e03400" },
  { tagName: "CTS", colour: "#885cd3" },
  { tagName: "Health", colour: "#4d67fc" },
  { tagName: "Fitness", colour: "#217ea8" },
  { tagName: "MutualFunds", colour: "#398700" },
  { tagName: "Finance", colour: "#737a18" },
  { tagName: "Devices", colour: "#ce4700" },
  { tagName: "Important", colour: "#ea0049" },
  { tagName: "Personal", colour: "#c500e8" },
  { tagName: "To Do", colour: "#038468" },
  { tagName: "Learning", colour: "#7a7a00" }, */
];

const colourLibrary = [
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
