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
    super(id, durationInMinutes);
    this.#title = title;
    this.#color = color;
    this.#startingTime = startingTime;
  }


  #title: string;
  #color: string;
  #startingTime: Date | undefined;
}
