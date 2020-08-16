import React from "react";
import { useSelector } from "react-redux";
import { BaseEventList } from "./BaseEventList";
import EventItemLoader from "./common/EventItemLoader";
import _ from "lodash";
import NoEventsPanel from "./common/NoEventsPanel";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { eventType, eventView } from "../utilities/constants";

export const FinalSortedFilteredEventList = () => {
  const allItems = useSelector((state) => state.eventItems);
  const settings = useSelector((state) => state.appSettings);
  const view = settings.eventView;
  const tags = settings.filters.map((item) => item.tagName);

  if (allItems.length === 0) {
    return (
      <>
        <EventItemLoader key={1} />
        <br />
        <EventItemLoader key={2} />
        <br />
        <EventItemLoader key={3} />
        <br />
        <EventItemLoader key={4} />
        <br />
      </>
    );
  }

  //sortBy = apply sorting based on condition
  const sortedItems = _.sortBy(allItems, [
    function (a) {
      return differenceInCalendarDays(new Date(), new Date(a.startDate));
    },
    "title",
  ]);

  const tagsFilteredSortedItems =
    tags.length > 0
      ? sortedItems.filter((item) => item.tags.some((t) => tags.includes(t)))
      : sortedItems;

  const activeEventItems = tagsFilteredSortedItems.filter(
    (item) => item.archived !== true
  );

  const archivedEventItems = tagsFilteredSortedItems.filter(
    (item) => item.archived === true
  );

  if (
    view === eventView.ARCHIVED_EVENT_VIEW &&
    archivedEventItems.length === 0
  ) {
    return <NoEventsPanel type={eventType.ARCHIVED_EVENT_TYPE} />;
  }

  const favouriteEventItems = activeEventItems.filter(
    (item) => item.favourite === true
  );

  if (
    view === eventView.FAVOURITE_EVENT_VIEW &&
    favouriteEventItems.length === 0
  ) {
    return <NoEventsPanel type={eventType.FAVOURITE_EVENT_TYPE} />;
  }

  const completedEventItems = activeEventItems.filter(
    (item) => item.archived !== true && item.completedEvent === true
  );
  if (
    view === eventView.COMPLETED_EVENT_VIEW &&
    completedEventItems.length === 0
  ) {
    return <NoEventsPanel type={eventType.COMPLETED_EVENT_TYPE} />;
  }

  const defaultEventItems = [
    ...activeEventItems.filter((item) => item.favourite === true),
    ...activeEventItems.filter((item) => item.favourite !== true),
  ];

  if (
    view !==
      (eventView.ARCHIVED_EVENT_VIEW ||
        eventView.COMPLETED_EVENT_VIEW ||
        eventView.FAVOURITE_EVENT_VIEW) &&
    defaultEventItems.length === 0
  ) {
    return <NoEventsPanel type="saved" />;
  }

  if (view === eventView.ARCHIVED_EVENT_VIEW) {
    return (
      <BaseEventList
        key={eventView.ARCHIVED_EVENT_VIEW}
        eventsToShow={archivedEventItems}
      />
    );
  } else if (view === eventView.FAVOURITE_EVENT_VIEW) {
    return (
      <BaseEventList
        key={eventView.FAVOURITE_EVENT_VIEW}
        eventsToShow={favouriteEventItems}
      />
    );
  } else if (view === eventView.COMPLETED_EVENT_VIEW) {
    return (
      <BaseEventList
        key={eventView.COMPLETED_EVENT_VIEW}
        eventsToShow={completedEventItems}
      />
    );
  } else {
    return <BaseEventList key="defaultList" eventsToShow={defaultEventItems} />;
  }
};
