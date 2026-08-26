import { Color } from "!/domain/model/enums/Color.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";

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
