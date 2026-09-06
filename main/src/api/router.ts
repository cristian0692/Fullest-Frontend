import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const saveDay = async (
  events: DayEventContainer,
  startTime: Date,
  endTime: Date,
) => {
  const data = {
    events,
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
