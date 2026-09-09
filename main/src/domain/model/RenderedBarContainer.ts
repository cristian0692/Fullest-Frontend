import { RenderedContainer } from "!/domain/model/RenderedContainer.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { Dragable } from "!/domain/model/dragables/Dragable.ts";
import { DragDayEvent } from "!/domain/model/dragables/DragDayEvent.ts";
import { BarPlaceholder } from "!/domain/model/dragables/BarPlaceHolder.ts";
import { TimeValue } from "!/domain/model/TimeValue.ts";

export class RenderedBarContainer extends RenderedContainer {
  #items: Dragable[];
  constructor(name: string, totalTime: TimeValue, items?: DayEvent[]) {
    super(name, items ?? []);
    this.#items = items?.map((item) => item.toDragDayEvent()) ?? [];

    this.fillEmptyBarWithPlaceholders(totalTime);
  }

  fillEmptyBarWithPlaceholders(remainingTime: TimeValue) {
    const placeholderTotalTime = this.#items.reduce((acc, currentValue) => {
      if (currentValue instanceof BarPlaceholder) {
        return acc + RenderedContainer.PLACEHOLDER_DURATION;
      } else return acc;
    }, 0);

    if (remainingTime.getTotalMinutes() >= placeholderTotalTime) {
      for (
        let i = 0;
        i < (remainingTime.getTotalMinutes() - placeholderTotalTime) / 15;
        i++
      ) {
        this.#items.push(this.insertUniquePlaceHolder());
      }
    } else {
      for (
        let i = 0;
        i < (placeholderTotalTime - remainingTime.getTotalMinutes()) / 15;
        i++
      ) {
        this.removeLastPlaceHolder();
      }
    }
  }
  insertUniquePlaceHolder() {
    for (let i = 0; i < RenderedContainer.MAX_PlACEHOLDERS; i++) {
      const id = "placeholder-" + i;
      if (!this.getAllPlaceHoldersId().includes(id)) {
        return new BarPlaceholder(i.toString());
      }
    }
    throw new Error("too many placeholders!");
  }

  getAllPlaceHoldersId() {
    return this.#items
      .filter((barEvent) => barEvent instanceof BarPlaceholder)
      .map((barEvent) => barEvent.getId());
  }

  countPlaceholders() {
    return this.#items.reduce((acc, item) => {
      if (item instanceof BarPlaceholder) {
        return acc + 1;
      } else return acc;
    }, 0);
  }

  removeLastPlaceHolder() {
    const newRenderedContainer = [...this.#items];
    let j = newRenderedContainer.length - 1;
    while (j >= 0) {
      const currentEvent = newRenderedContainer[j];
      if (currentEvent instanceof BarPlaceholder) {
        newRenderedContainer.splice(j, 1);
        break;
      } else {
        j -= 1;
      }
    }
    this.#items = newRenderedContainer;
  }

  addMissingPlaceholdersAfterRemoval(index: number, minutesRemoved: number) {
    for (let i = 0; i < minutesRemoved / 15; i++) {
      this.insert<Dragable>(this.#items, this.insertUniquePlaceHolder(), index);
    }
    index += 1;
  }

  removeExtraPlaceholdersAfterInsertion(
    eventIndex: number,
    quantityMoved: number,
  ) {
    let leftAvailable = true;
    let rightAvailable = true;
    for (let i = 0; i < quantityMoved / 15; i++) {
      if (!leftAvailable && !rightAvailable) {
        console.log("no more time left!");
        break;
      }
      let isSubstractingFromLeft;
      if (!leftAvailable) isSubstractingFromLeft = false;
      else if (!rightAvailable) isSubstractingFromLeft = true;
      else isSubstractingFromLeft = i % 2 === 0 ? true : false;

      const removalFailed = this.#removePlaceholder(
        isSubstractingFromLeft,
        eventIndex,
      );
      if (
        this.#succesfullyRemovedFromLeft(isSubstractingFromLeft, removalFailed)
      ) {
        eventIndex -= 1;
      }
      if (removalFailed) {
        if (isSubstractingFromLeft) leftAvailable = false;
        else rightAvailable = false;
        quantityMoved += this.#addOneMoreIteration();
      }
    }
  }

  #succesfullyRemovedFromLeft(
    isDirectionLeft: boolean,
    removalFailed: boolean,
  ) {
    return isDirectionLeft && !removalFailed;
  }

  #addOneMoreIteration() {
    return 15;
  }
  #removePlaceholder(isDirectionLeft: boolean, index: number) {
    let quantity = 1;
    if (isDirectionLeft === true) {
      while (!(index - quantity < 0)) {
        if (this.#items[index - quantity] instanceof DragDayEvent) {
          quantity += 1;
          continue;
        }
        this.remove(this.#items, index - quantity);

        return false;
      }
    } else {
      while (!(index + quantity >= this.#items.length)) {
        if (this.#items[index + quantity] instanceof DragDayEvent) {
          quantity += 1;
          continue;
        }
        this.remove(this.#items, index + quantity);
        return false;
      }
    }
    return true;
  }
  calculateEventIndex(index?: number) {
    let eventIndex = 0;

    if (index == undefined) {
      return this.events.length;
    }

    while (index > 0) {
      const item = this.#items[index - 1];
      if (item instanceof DragDayEvent) {
        eventIndex += 1;
      }
      index -= 1;
    }

    return eventIndex;
  }

  override moveEvent(oldIndex: number, newIndex: number) {
    const dragEvent = this.#items[oldIndex];
    this.remove<Dragable>(this.#items, oldIndex);
    this.insert<Dragable>(this.#items, dragEvent, newIndex);
  }

  override insertEvent(dayEvent: DayEvent, index?: number) {
    const eventIndex = this.calculateEventIndex(index);
    const eventDuration = dayEvent.toDragDayEvent().getDurationInMinutes();
    if (this.countPlaceholders() * 15 < eventDuration) {
      throw new Error("Not enough placeholders to insert the event!");
    }

    this.insert<Dragable>(this.#items, dayEvent.toDragDayEvent(), index);
    this.insert<DayEvent>(this.events, dayEvent, eventIndex);
    this.removeExtraPlaceholdersAfterInsertion(
      index ?? this.#items.length - 1,
      eventDuration,
    );
  }

  override removeEvent(index: number) {
    const eventIndex = this.calculateEventIndex(index);

    this.removeItem(index);
    this.remove<DayEvent>(this.events, eventIndex);
  }
  removeItem(index: number) {
    const dragEvent: Dragable = this.#items[index];
    this.remove<Dragable>(this.#items, index);

    return dragEvent;
  }

  findEventInitems(eventId: string) {
    return this.#items.findIndex((item) => item.getId() === eventId);
  }

  override getItems() {
    return this.#items;
  }
}
