import { Color } from "!/domain/model/enums/Color.ts";
import { Dragable } from "!/domain/model/dragables/Dragable.ts";
import { TimeValue } from "!/domain/model/TimeValue.ts";

export class DragDayEvent extends Dragable {
  constructor(
    id: string,
    title: string,
    color: Color,
    duration: TimeValue,
    startingTime?: Date,
  ) {
    super(id, duration);
    this.#title = title;
    this.#color = color;
    this.#startingTime = startingTime;
  }


  #title: string;
  #color: string;
  #startingTime: Date | undefined;
}
