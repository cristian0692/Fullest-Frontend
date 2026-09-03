import { DayEvent } from "!/domain/model/DayEvent.ts";

export class DayEventContainer {
  protected events: DayEvent[];
  protected name: string;

  constructor(name: string, events?: DayEvent[]) {
    this.name = name;
    this.events = events ?? [];
  }

  getEvents() {
    return this.events;
  }

  setEvents(items: DayEvent[]) {
    this.events = items;
  }

  getName() {
    return this.name;
  }

  countItemsOfSameDayEventypeBeforeIndex(
    index: number,
    referenceItem: DayEvent = this.events[index],
  ) {
    let count = 0;
    for (let i = 0; i < index; i++) {
      if (this.events[i]?.constructor === referenceItem?.constructor) count++;
    }
    return count;
  }

  insertEvent(event: DayEvent, index?: number) {
    if (index != undefined)
      this.events = [
        ...this.events.slice(0, index),
        event,
        ...this.events.slice(index),
      ];
    else this.events = [...this.events, event];
  }

  removeEvent(index: number) {
    this.events = [
      ...this.events.slice(0, index),
      ...this.events.slice(index + 1),
    ];
  }
}
