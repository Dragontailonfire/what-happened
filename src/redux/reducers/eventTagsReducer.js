import * as types from "../actions/actionTypes";
import _ from "lodash";
import { tagColors } from "../../utilities/constants";
import { eventTags } from "../../utilities/defaults";

export default function eventTagsReducer(state = eventTags, action) {
  switch (action.type) {
    case types.CREATE_EVENT_TAG:
      // sample = pick random item from array
      return [...state, { ...action.eventTag, colour: _.sample(tagColors) }];
    case types.DELETE_EVENT_TAG:
      return state.filter(
        (eventTag) => eventTag.tagName !== action.eventTag.tagName
      );
    default:
      return state;
  }
}
