import { combineReducers } from "redux";
import eventItems from "./eventOperationReducer";
import appSettings from "./appSettingsReducer";
import eventTags from "./eventTagsReducer";

const rootReducer = combineReducers({ eventItems, appSettings, eventTags });

export default rootReducer;
