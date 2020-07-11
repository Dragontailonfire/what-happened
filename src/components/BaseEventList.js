import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import {
  formatDistanceToNowStrict,
  intervalToDuration,
  formatDuration,
} from "date-fns";
import { EventItemCard } from "./EventItemCard";

export const BaseEventList = ({ eventsToShow }) => {
  const allEventTags = useSelector((state) => state.eventTags);

  return (
    <>
      {eventsToShow.map((e) => {
        let currentDuration = formatDistanceToNowStrict(new Date(e.startDate), {
          addSuffix: true,
        });

        if (e.checkedYears)
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
          });

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

        let finishedDuration = e.endDate
          ? formatDuration(
              intervalToDuration({
                start: new Date(e.startDate),
                end: new Date(e.endDate),
              }),
              {
                format: ["years", "months", "days"],
                delimiter: " ",
              }
            )
          : null;

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
              duration={currentDuration}
              startDate={e.startDate}
              description={e.description}
              endDate={e.endDate}
              finishedDuration={finishedDuration}
              favourite={e.favourite}
              archived={e.archived}
              edit={e.edit}
              tags={finalTags}
              annualEvent={e.annualEvent}
            />
            <br />
          </>
        );
      })}
    </>
  );
};
