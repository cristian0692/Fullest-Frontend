import type { DayData, DayEvent } from "?/types.ts";
import { getTimeMinutes } from "@/Logics/Hooks/TimeProvider.tsx";

const calculateStartEndTimes = (
  events: (DayEvent | undefined)[],
  startTime: Date,
) => {
  const newEvents: DayEvent[] = [];
  const currentTime = new Date(startTime);

  events.forEach((event) => {
    if (event == undefined) {
      currentTime.setMinutes(currentTime.getMinutes() + 15);
      return;
    }
    const newEvent = event;
    newEvent.startTime = new Date(currentTime).toISOString();
    currentTime.setMinutes(
      currentTime.getMinutes() + getTimeMinutes(event.duration),
    );
    newEvent.endTime = new Date(currentTime).toISOString();

    newEvents.push(newEvent);
  });

  return newEvents;
};

export const saveDay = async (
  events: (DayEvent | undefined)[],
  startTime: Date,
  endTime: Date,
) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
  if (!BACKEND_PORT || !BACKEND_URL) {
    throw new Error("wrong config!");
  }

  const newEvents = calculateStartEndTimes(events, startTime);

  const data: DayData = {
    events: newEvents,
    day: startTime.toISOString(),
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
  };
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/api/day`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Day failed to save!");
  }
  return response.json();
};
