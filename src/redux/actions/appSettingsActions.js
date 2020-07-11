import * as types from "./actionTypes";

export function toggleAppTheme(appSettings) {
  return { type: types.TOGGLE_APP_THEME, appSettings };
}

export function changeAppView(appSettings) {
  return { type: types.CHANGE_APP_VIEW, appSettings };
}

export function changeAppFilter(appSettings) {
  return { type: types.CHANGE_APP_FILTER, appSettings };
}
