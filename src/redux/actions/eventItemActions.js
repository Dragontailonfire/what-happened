import * as types from "./actionTypes";

export function createEventItem(eventItem) {
  return { type: types.CREATE_EVENT_ITEM, eventItem };
}

export function updatingEventItem(eventItem) {
  return { type: types.UPDATING_EVENT_ITEM, eventItem };
}

export function updatedEventItem(eventItem) {
  return { type: types.UPDATED_EVENT_ITEM, eventItem };
}

export function deleteEventItem(eventItem) {
  return { type: types.DELETE_EVENT_ITEM, eventItem };
}

export function favouriteEventItem(eventItem) {
  return { type: types.FAVOURITE_EVENT_ITEM, eventItem };
}

export function archiveEventItem(eventItem) {
  return { type: types.ARCHIVE_EVENT_ITEM, eventItem };
}

export function createEventTag(eventTag) {
  return { type: types.CREATE_EVENT_TAG, eventTag };
}

export function deleteEventTag(eventTag) {
  return { type: types.DELETE_EVENT_TAG, eventTag };
}
