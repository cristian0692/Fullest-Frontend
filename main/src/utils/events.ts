import type { DayEvent } from "?/types.ts";

export const findEventById = (events: DayEvent[], id: string) => {
  const currentEvent = events.find((ev) => ev.id === id);

  if (!currentEvent) {
    return null;
  }

  return currentEvent;
};
