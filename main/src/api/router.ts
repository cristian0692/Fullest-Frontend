import { TimeValue } from "!/domain/model/TimeValue.ts";
import { DayEventDto } from "!/api/dtos/DayEventDto.ts";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

export const saveDay = async (
  events: DayEventDto[],
  startTime: TimeValue,
  endTime: TimeValue,
) => {
  const data = {
    events,
    date: new Date().toString(),
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

export const loginUser = async (credentials: Credentials) => {
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Login Failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export type Credentials = {
  username: string;
  password: string;
};
