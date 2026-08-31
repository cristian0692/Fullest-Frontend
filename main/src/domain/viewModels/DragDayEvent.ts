import { Color } from "!/domain/model/enums/Color.ts";

export class DragDayEvent {
  constructor(
    id: string,
    title: string,
    color: Color,
    durationInMinutes: number,
    startingTime?: Date,
  ) {
    this.#id = id;
    this.#title = title;
    this.#color = color;
    this.#durationInMinutes = durationInMinutes;
    this.#startingTime = startingTime;
  }

  getId() {
    return this.#id;
  }
  getDuration() {
    return this.#durationInMinutes;
  }
  #id: string;
  #title: string;
  #color: string;
  #durationInMinutes: number;
  #startingTime: Date | undefined;
}
