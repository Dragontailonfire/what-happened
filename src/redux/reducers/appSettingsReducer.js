import * as types from "../actions/actionTypes";
import { appSettings } from "../../utilities/defaults";

export default function appSettingsReducer(state = appSettings, action) {
  switch (action.type) {
    case types.TOGGLE_APP_THEME:
      return { ...state, ...action.appSettings };
    case types.TOGGLE_EVENT_EDIT_MODE:
      return { ...state, ...action.appSettings };
    case types.CHANGE_APP_VIEW:
      return { ...state, ...action.appSettings };
    case types.CHANGE_APP_FILTER:
      return { ...state, ...action.appSettings };
    default:
      return state;
  }
}
