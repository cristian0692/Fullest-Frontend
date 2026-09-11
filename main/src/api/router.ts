import { DayEvent } from "!/domain/model/DayEvent.ts";
import { TimeValue } from "!/domain/model/TimeValue.ts";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const saveDay = async (
  events: (DayEvent | undefined)[],
  startTime: TimeValue,
  endTime: TimeValue,
) => {
  const data = {
    events,
    day: startTime.toString(),
    startTime: startTime.toString(),
    endTime: endTime.toString(),
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
