import { Color } from "!/domain/model/enums/Color.ts";
import { Dragable } from "!/domain/model/dragables/Dragable.ts";

export class DragDayEvent extends Dragable {
  constructor(
    id: string,
    title: string,
    color: Color,
    durationInMinutes: number,
    startingTime?: Date,
  ) {
    super(id);
    this.#title = title;
    this.#color = color;
    this.#durationInMinutes = durationInMinutes;
    this.#startingTime = startingTime;
  }

  getDuration() {
    return this.#durationInMinutes;
  }
  #title: string;
  #color: string;
  #durationInMinutes: number;
  #startingTime: Date | undefined;
}
