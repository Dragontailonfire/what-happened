import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import {
  formatDistanceToNowStrict,
  intervalToDuration,
  formatDuration,
} from "date-fns";
import { EventItemCard } from "./EventItemCard";
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

export const BaseEventList = ({ eventsToShow }) => {
  const allEventTags = useSelector((state) => state.eventTags);

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

  const colourLibraryA2 = [
    red["A200"],
    pink["A200"],
    purple["A200"],
    deepPurple["A200"],
    indigo["A200"],
    blue["A200"],
    lightBlue["A200"],
    cyan["A200"],
    teal["A200"],
    green["A200"],
    lightGreen["A200"],
    lime["A200"],
    yellow["A200"],
    amber["A200"],
    orange["A200"],
    deepOrange["A200"],
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

  return (
    <>
      {eventsToShow.map((e) => {
        let currentDuration = formatDistanceToNowStrict(new Date(e.startDate), {
          addSuffix: true,
        });

        /* if (e.checkedYears)
          currentDuration = formatDistanceToNowStrict(new Date(e.startDate), {
            addSuffix: true,
            unit: "year",
          });
        if (e.checkedMonths)
          currentDuration = formatDistanceToNowStrict(new Date(e.startDate), {
            addSuffix: true,
            unit: "month",
          });
        if (e.checkedDays)
          currentDuration = formatDistanceToNowStrict(new Date(e.startDate), {
            addSuffix: true,
            unit: "day",
          }); */

        /*
        let formatToDisplay = [];
         if (e.checkedYears) formatToDisplay.push("years");
        if (e.checkedMonths) formatToDisplay.push("months");
        if (e.checkedDays) formatToDisplay.push("days"); */

        /* formatToDisplay.length > 0
            ? formatDuration(
                intervalToDuration({
                  start: new Date(e.startDate),
                  end: new Date(),
                }),
                {
                  format: formatToDisplay,
                }
              )
            : formatDistanceToNowStrict(new Date(e.startDate), {
                addSuffix: true,
              }); */

        let detailedDuration = formatDuration(
          intervalToDuration({
            start: new Date(e.startDate),
            end: e.endDate ? new Date(e.endDate) : new Date(),
          }),
          {
            format: ["years", "months", "days"],
            delimiter: " ",
          }
        );
        /* 
        This is used to display only Active filters in the system
        keyBy = returns object matching the key. 
        at = returns all matching objects available in array
        */
        let tags = _(allEventTags).keyBy("tagName").at(e.tags).value();

        //compact = removes null values
        let finalTags = _.compact(tags);

        return (
          <>
            <EventItemCard
              key={e.id}
              id={e.id}
              title={e.title}
              cardColor={_.sample(colourLibraryA7)}
              duration={currentDuration}
              startDate={e.startDate}
              description={e.description}
              endDate={e.endDate}
              detailedDuration={detailedDuration}
              favourite={e.favourite}
              archived={e.archived}
              edit={e.edit}
              tags={finalTags}
              setReminder={e.setReminder}
              completedEvent={e.completedEvent}
            />
            <br />
            <br />
          </>
        );
      })}
    </>
  );
};
