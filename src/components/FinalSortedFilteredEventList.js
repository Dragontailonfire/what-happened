import React from "react";
import { useSelector } from "react-redux";
import { BaseEventList } from "./BaseEventList";
import EventItemLoader from "./common/EventItemLoader";
import _ from "lodash";
import * as dateCalculation from "../utilities/DateUtils";
import NoEventsPanel from "./common/NoEventsPanel";

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
      return dateCalculation.daysBetween(new Date(a.startDate), new Date());
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

  if (view === "Archived" && archivedEventItems.length === 0) {
    return <NoEventsPanel type="archived" />;
  }

  const favouriteEventItems = activeEventItems.filter(
    (item) => item.favourite === true
  );

  if (view === "Favourites" && favouriteEventItems.length === 0) {
    return <NoEventsPanel type="favourite" />;
  }

  const completedEventItems = activeEventItems.filter(
    (item) => item.eventEnded === true
  );
  if (view === "Completed" && completedEventItems.length === 0) {
    return <NoEventsPanel type="completed" />;
  }

  const defaultEventItems = [
    ...activeEventItems.filter((item) => item.favourite === true),
    ...activeEventItems.filter((item) => item.favourite !== true),
  ];

  if (
    view !== ("Archived" || "Completed" || "Favourites") &&
    defaultEventItems.length === 0
  ) {
    return <NoEventsPanel type="saved" />;
  }

  if (view === "Archived") {
    return (
      <BaseEventList key="archivedList" eventsToShow={archivedEventItems} />
    );
  } else if (view === "Favourites") {
    return (
      <BaseEventList key="favouriteList" eventsToShow={favouriteEventItems} />
    );
  } else if (view === "Completed") {
    return (
      <BaseEventList key="completedList" eventsToShow={completedEventItems} />
    );
  } else {
    return <BaseEventList key="defaultList" eventsToShow={defaultEventItems} />;
  }
};
