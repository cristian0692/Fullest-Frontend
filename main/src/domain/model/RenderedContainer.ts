import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { Dragable } from "!/domain/model/dragables/Dragable.ts";
export class RenderedContainer extends DayEventContainer {
  static PLACEHOLDER_DURATION = 15;
  static MAX_PlACEHOLDERS = 24 * (60 / this.PLACEHOLDER_DURATION);

  constructor(name: string, events?: DayEvent[]) {
    super(name, events ?? []);
  }

  moveEvent(oldIndex: number, newIndex: number) {
    this.move<DayEvent>(this.events, oldIndex, newIndex);
  }

  override insertEvent(dayEvent: DayEvent, index?: number) {
    this.insert<DayEvent>(this.events, dayEvent, index);
    dayEvent.removeStartTime();
  }

  override removeEvent(index: number) {
    this.remove<DayEvent>(this.events, index);
  }

  protected insert<T>(array: T[], t: T, index?: number) {
    if (index != undefined) array.splice(index, 0, t);
    else array.push(t);
  }

  protected remove<T>(array: T[], index: number) {
    array.splice(index, 1);
  }

  protected move<T>(array: T[], oldIndex: number, newIndex: number) {
    const item = array[oldIndex];
    this.remove<T>(array, oldIndex);
    this.insert<T>(array, item, newIndex);
  }

  findEventIdInDragables(id: string): number {
    return this.events.findIndex((event) => event.getId() === id);
  }

  getDragables(): Dragable[] {
    return this.events.map((event) => event.toDragDayEvent());
  }

  toEventIndex(index: number): number {
    throw new Error("toEventIndex method should be implemented in subclasses");
  }


}
