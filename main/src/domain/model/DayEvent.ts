import { Color } from "!/domain/model/enums/Color.ts";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";
import { getTimeMinutes } from "@/Logics/Hooks/TimeProvider.tsx";

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

  getDuration() {
    return this.#duration;
  }

  GetColor() {
    return this.#color;
  }

  getTitle() {
    return this.#title;
  }
  getDescription() {
    return this.#description;
  }

  toDragDayEvent(startTime?: Date) {
    return new DragDayEvent(
      this.#id,
      this.#title,
      this.#color,
      getTimeMinutes(this.#duration),
      startTime,
    );
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
