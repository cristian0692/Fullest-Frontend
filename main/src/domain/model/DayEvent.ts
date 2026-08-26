import { Color } from "!/domain/model/enums/Color.ts";

export class DayEvent {
  constructor(
    id: string,
    title: string,
    description: string,
    color: Color,
    duration: Date,
  ) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#color = color;
    this.#duration = duration;
  }

  getId() {
    return this.#id;
  }

  #id: string;
  #title: string;
  #description: string;
  #color: Color;
  #duration: Date;
  #endTime?: string;
  #startTime?: string;
  #segment?: number; //position on bar of the event if placed
}
