import * as types from "../actions/actionTypes";
import _ from "lodash";
import { eventList } from "../../utilities/defaults";

export default function eventOperationReducer(state = eventList, action) {
  switch (action.type) {
    case types.CREATE_EVENT_ITEM:
      return [...state, { ...action.eventItem }];

    case types.UPDATING_EVENT_ITEM:
      return state.map((eventItem) =>
        eventItem.id === action.eventItem.id
          ? { ...eventItem, ...action.eventItem }
          : eventItem
      );
    case types.UPDATED_EVENT_ITEM:
      return state.map((eventItem) =>
        eventItem.id === action.eventItem.id
          ? { ...eventItem, ...action.eventItem }
          : eventItem
      );
    case types.DELETE_EVENT_ITEM:
      return state.filter((eventItem) => eventItem.id !== action.eventItem.id);
    case types.FAVOURITE_EVENT_ITEM:
      return state.map((eventItem) =>
        eventItem.id === action.eventItem.id
          ? { ...eventItem, ...action.eventItem }
          : eventItem
      );
    case types.ARCHIVE_EVENT_ITEM:
      return state.map((eventItem) =>
        eventItem.id === action.eventItem.id
          ? { ...eventItem, ...action.eventItem }
          : eventItem
      );
    case types.DELETE_EVENT_TAG:
      /* 
      includes = check value is present in array
      without  = create a new array removing provided value
      */
      return state.map((eventItem) =>
        _.includes(eventItem.tags, action.eventTag.tagName)
          ? {
              ...eventItem,
              tags: _.without(eventItem.tags, action.eventTag.tagName),
            }
          : eventItem
      );
    default:
      return state;
  }
}

/* function eventStateReducer(eventState) {
  return (state, action) => {
    return {
      ...state,
      eventItems: state.eventItems.map((eventItem) =>
        eventItem.id === action.id
          ? { ...eventItem, state: eventState }
          : eventItem
      ),
    };
  };
} */
