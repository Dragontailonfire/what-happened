import * as types from "../actions/actionTypes";
import _ from "lodash";

export default function eventOperationReducer(
  state = defaultEventList,
  action
) {
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

//const defaultEventList = [];

const defaultEventList = [
  /* {
    id: "2",
    title: "Piggy bday",
    startDate: "1992-09-05T18:30:00.000Z",
    createdDate: "Sun, 24 May 2020 09:08:26 GMT",
    description: "The birthday of Piggy.",
    checkedDays: false,
    checkedMonths: true,
    checkedYears: false,
    eventEnded: false,
    annualEvent: true,
    lastEditedDate: "2020-06-23T06:54:04.177Z",
    edit: false,
    favourite: true,
    archived: false,
    tags: ["Birthdays"],
    duration: "28 years ago",
    endDate: "",
    finishedDuration: "",
  }, */
  {
    id: "1",
    title: "B day",
    startDate: "1990-08-05T18:30:00.000Z",
    createdDate: "Sun, 24 May 2020 09:08:26 GMT",
    description: "My birthday.",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: true,
    eventEnded: false,
    annualEvent: true,
    lastEditedDate: "2020-06-23T06:50:02.079Z",
    edit: false,
    favourite: true,
    archived: false,
    tags: ["Birthdays", "Personal"],
    duration: "30 years ago",
    endDate: "",
    finishedDuration: "",
  },
  {
    id: "3",
    title: "Joined Neudesic",
    startDate: "2020-01-05T18:30:00.000Z",
    createdDate: "Sun, 24 May 2020 09:08:26 GMT",
    description: "Joined Neudesic Kochi.",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: false,
    eventEnded: false,
    annualEvent: false,
    lastEditedDate: "2020-06-23T06:50:41.136Z",
    edit: false,
    favourite: false,
    archived: false,
    tags: ["Work", "Neudesic"],
    duration: "6 months ago",
    endDate: "",
    finishedDuration: "",
  },
  {
    id: "4",
    title: "Joined CTS",
    startDate: "2013-02-02T18:30:00.000Z",
    createdDate: "Sun, 24 May 2020 09:08:26 GMT",
    description: "The day that I joined Cognizant.",
    checkedDays: true,
    checkedMonths: false,
    checkedYears: false,
    eventEnded: true,
    annualEvent: false,
    endDate: "2019-12-23T17:24:56.100Z",
    lastEditedDate: "2020-06-23T06:50:48.974Z",
    edit: false,
    favourite: false,
    archived: false,
    tags: ["Work", "CTS"],
    duration: "7 years ago",
    finishedDuration: "7 years 11 months and 24 days!",
  },
  {
    id: "5",
    title: "Next month 1",
    startDate: "2020-08-24T18:30:00.000Z",
    createdDate: "Sun, 24 May 2020 09:08:26 GMT",
    description: "Something happened",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: false,
    eventEnded: false,
    annualEvent: true,
    lastEditedDate: "2020-06-23T06:51:34.396Z",
    edit: false,
    favourite: false,
    archived: false,
    tags: [],
    duration: "90 years ago",
    endDate: "",
    finishedDuration: "",
  },
  {
    id: "6",
    title: "Max characters we can type=30",
    startDate: "1950-03-24T18:30:00.000Z",
    createdDate: "Sun, 24 May 2020 09:08:26 GMT",
    description: "Something else happened",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: true,
    eventEnded: false,
    annualEvent: false,
    lastEditedDate: "2020-06-23T06:51:22.223Z",
    edit: false,
    favourite: true,
    archived: false,
    tags: [
      "Birthdays",
      "Insurance",
      "Work",
      "Vehicle",
      "Neudesic",
      "CTS",
      "Health",
      "Fitness",
      "Finance",
      "Devices",
      "MutualFunds",
      "Important",
      "Personal",
      "Learning",
      "To Do",
    ],
    duration: "70 years ago",
    endDate: "",
    finishedDuration: "",
  },
  {
    id: "7",
    title: "Next month 2",
    startDate: "2020-08-01T18:30:00.000Z",
    createdDate: "Sun, 24 May 2020 09:08:26 GMT",
    description: "Then something more happened",
    checkedDays: true,
    checkedMonths: true,
    checkedYears: true,
    eventEnded: false,
    annualEvent: false,
    lastEditedDate: "2020-06-23T06:51:14.078Z",
    edit: false,
    favourite: false,
    archived: false,
    tags: [],
    duration: "50 years ago",
    endDate: "",
    finishedDuration: "",
  },
  {
    id: "8",
    title: "|--- Lockdown ---|",
    startDate: "2020-03-24T18:30:00.000Z",
    createdDate: "Sun, 24 May 2020 09:08:26 GMT",
    description: "The COVID-19 nation-wide lockdown.",
    checkedDays: false,
    checkedMonths: true,
    checkedYears: false,
    eventEnded: false,
    annualEvent: false,
    lastEditedDate: "2020-06-23T06:50:35.641Z",
    edit: false,
    favourite: false,
    archived: false,
    tags: [],
    duration: "3 months ago",
    endDate: "",
    finishedDuration: "",
  },
  {
    id: "9",
    title: "Something archived",
    startDate: "25 March 1930",
    createdDate: "Sun, 24 May 2000 09:08:26 GMT",
    description: "Something happened",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: false,
    eventEnded: false,
    annualEvent: true,
    lastEditedDate: "Mon, 08 Jun 2020 06:18:19 GMT",
    edit: false,
    favourite: false,
    archived: true,
    tags: [],
  },
  {
    id: "10",
    title: "Something archived again",
    startDate: "25 March 1930",
    createdDate: "Sun, 24 May 2005 09:08:26 GMT",
    description: "Something happened",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: false,
    eventEnded: false,
    annualEvent: true,
    lastEditedDate: "Mon, 08 Jun 2020 06:18:19 GMT",
    edit: false,
    favourite: false,
    archived: true,
    tags: [],
  },
  {
    id: "11",
    title: "Something else archived next month",
    startDate: "2020-08-01T18:30:00.000Z",
    createdDate: "Sun, 24 May 2010 09:08:26 GMT",
    description: "Something happened",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: false,
    eventEnded: false,
    annualEvent: true,
    lastEditedDate: "Mon, 08 Jun 2020 06:18:19 GMT",
    edit: false,
    favourite: false,
    archived: true,
    tags: [],
  },
  {
    id: "12",
    title: "Same month",
    startDate: "2020-07-28T18:30:00.000Z",
    createdDate: "Sun, 24 May 2010 09:08:26 GMT",
    description: "Something happened",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: false,
    eventEnded: false,
    annualEvent: true,
    lastEditedDate: "Mon, 08 Jun 2020 06:18:19 GMT",
    edit: false,
    favourite: false,
    archived: false,
    tags: [],
  },
  {
    id: "13",
    title: "Same month before",
    startDate: "2020-07-01T18:30:00.000Z",
    createdDate: "Sun, 24 May 2010 09:08:26 GMT",
    description: "Something happened",
    checkedDays: false,
    checkedMonths: false,
    checkedYears: false,
    eventEnded: false,
    annualEvent: true,
    lastEditedDate: "Mon, 08 Jun 2020 06:18:19 GMT",
    edit: false,
    favourite: false,
    archived: false,
    tags: [],
  },
];
