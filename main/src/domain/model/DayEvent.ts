import { Color } from "!/domain/model/enums/Color.ts";
import { DragDayEvent } from "!/domain/model/dragables/DragDayEvent.ts";
import { TimeValue } from "!/domain/model/TimeValue.ts";

export class DayEvent {
  constructor(
    id: string,
    title: string,
    description: string,
    color: Color,
    duration: TimeValue,
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

  getDurationInMinutes() {
    return this.#duration.getTotalMinutes();
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

  getStartTime() {
    return this.#startTime;
  }

  getEndTime(){
    if(this.#startTime == null){
      throw new Error("startTime needs to be defined to calculate endTime");
    }
    return TimeValue.add(this.#startTime, this.#duration);
  }


  setStartTime(startTime: TimeValue){
    this.#startTime = startTime;
  }

  removeStartTime(){
    this.#startTime = undefined;
  }

  toDragDayEvent(startTime?: Date) {
    return new DragDayEvent(
      this.#id,
      this.#title,
      this.#color,
      this.#duration,
      startTime,
    );
  }

  static findEventById(events: DayEvent[], id: string) {
    const currentEvent = events.find((ev) => ev.getId() === id);

    if (!currentEvent) {
      return null;
    }

    return currentEvent;
  }

  #id: string;
  #title: string;
  #description: string;
  #color: Color;
  #duration: TimeValue;
  #startTime?: TimeValue;
  #segment?: number; //position on bar of the event if placed
}
