import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import {
  formatDistanceToNowStrict,
  intervalToDuration,
  formatDuration,
} from "date-fns";
import { EventItemCard } from "./EventItemCard";
import { Grow } from "@material-ui/core";
import { cardColors } from "../utilities/constants";

export const BaseEventList = ({ eventsToShow }) => {
  const allEventTags = useSelector((state) => state.eventTags);
  return (
    <>
      {eventsToShow.map((e) => {
        let currentDuration = formatDistanceToNowStrict(new Date(e.startDate), {
          addSuffix: true,
        });
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

        const FinalEventCard = (props) => {
          return (
            <div {...props}>
              <EventItemCard
                key={e.id}
                id={e.id}
                title={e.title}
                cardColor={_.sample(cardColors)}
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
            </div>
          );
        };
        return (
          <Grow in={true}>
            <FinalEventCard />
          </Grow>
        );
      })}
    </>
  );
};
