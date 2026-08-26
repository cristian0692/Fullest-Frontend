import { DayEvent } from "!/domain/model/DayEvent.ts";

export const findEventById = (events: DayEvent[], id: string) => {
  const currentEvent = events.find((ev) => ev.getId() === id);

  if (!currentEvent) {
    return null;
  }

  return currentEvent;
};
