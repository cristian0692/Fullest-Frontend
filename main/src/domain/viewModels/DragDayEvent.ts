import { Color } from "!/domain/model/enums/Color.ts";

export class DragDayEvent {
  constructor(
    id: string,
    title: string,
    color: Color,
    durationInHours: number,
    startingTime: Date,
  ) {
    this.#id = id;
    this.#title = title;
    this.#color = color;
    this.#durationInHours = durationInHours;
    this.#startingTime = startingTime;
  }

  getId() {
    return this.#id;
  }

  #id: string;
  #title: string;
  #color: string;
  #durationInHours: number;
  #startingTime: Date;
}

