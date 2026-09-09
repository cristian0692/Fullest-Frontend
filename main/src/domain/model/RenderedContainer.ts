import { BarPlaceholder } from "!/domain/model/dragables/BarPlaceHolder.ts";
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
    const dayEvent = this.events[oldIndex];
    this.remove<DayEvent>(this.events, oldIndex);
    this.insert<DayEvent>(this.events, dayEvent, newIndex);
  }

  override insertEvent(dayEvent: DayEvent, index?: number) {
    this.insert<DayEvent>(this.events, dayEvent, index);
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

  getItems(): Dragable[] {
    return this.events.map((event) => event.toDragDayEvent());
  }


}
