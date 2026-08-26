import { Color, DayEvent } from "?/types.ts";

export const createEvent = (
  id: string,
  title: string,
  description: string,
  color: Color,
  duration: Date,
) => {
  const event: DayEvent = {
    id,
    title,
    description,
    color,
    duration,
  };

  return event;
};
