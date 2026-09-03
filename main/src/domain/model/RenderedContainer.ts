import { BarPlaceholder } from "!/domain/model/dragables/BarPlaceHolder.ts";
import { DragDayEvent } from "!/domain/model/dragables/DragDayEvent.ts";
import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { Dragable } from "!/domain/model/dragables/Dragable.ts";
export class RenderedContainer extends DayEventContainer {
  static PLACEHOLDER_DURATION = 15;
  static MAX_PlACEHOLDERS = 24 * (60 / this.PLACEHOLDER_DURATION);
  #items: Dragable[];
  constructor(name: string) {
    super(name, []);
    this.#items = [];
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
  fillEmptyBarWithPlaceholders(remainingTime: number) {
    const placeholderTotalTime = this.#items.reduce((acc, currentValue) => {
      if (currentValue instanceof BarPlaceholder) {
        return acc + RenderedContainer.PLACEHOLDER_DURATION;
      } else return acc;
    }, 0);

    if (remainingTime >= placeholderTotalTime) {
      for (let i = 0; i < (remainingTime - placeholderTotalTime) / 15; i++) {
        this.#items.push(this.insertUniquePlaceHolder());
      }
    } else {
      for (let i = 0; i < (placeholderTotalTime - remainingTime) / 15; i++) {
        this.removeLastPlaceHolder();
      }
    }
  }

  addMissingPlaceholdersAfterRemoval(index: number, minutesRemoved: number) {
    const newRenderedContainer = [...this.#items];
    for (let i = index; i < minutesRemoved / 15; i++) {
      this.#items = [
        ...this.#items.slice(0, index),
        this.insertUniquePlaceHolder(),
        ...this.#items.slice(index + 1),
      ];
    }
    this.#items = newRenderedContainer;
  }

  removeExtraPlaceholdersAfterInsertion(
    eventIndex: number,
    quantityMoved: number,
  ) {
    let leftAvailable = true;
    let rightAvailable = false;
    for (let i = 0; i < quantityMoved / 15; i++) {
      const isSubstractingFromLeft = i % 2 === 0 ? true : false;
      const result = this.#removePlaceholder(
        isSubstractingFromLeft,
        eventIndex,
      );

      if (this.#removalFailed(result)) {
        if (isSubstractingFromLeft) leftAvailable = false;
        else rightAvailable = false;
        quantityMoved += this.#addOneMoreIteration();
      }
    }

    if (!leftAvailable && !rightAvailable) {
      console.log("no more time left!");
    }
  }
  #removalFailed(result: boolean) {
    return !result;
  }
  #addOneMoreIteration() {
    return 15;
  }
  #removePlaceholder(isDirectionLeft: boolean, index: number) {
    let quantity = 1;
    if (isDirectionLeft === true) {
      while (!(index - quantity < 0)) {
        if (this.events[index - quantity] instanceof DragDayEvent) {
          quantity += 1;
          continue;
        }
        this.events = [
          ...this.events.slice(0, index - quantity),
          ...this.events.slice(index - quantity + 1),
        ];
        index -= 1;

        return true;
      }
    } else if (isDirectionLeft === false) {
      while (!(index + quantity >= this.events.length)) {
        if (this.events[index + quantity] instanceof DragDayEvent) {
          quantity += 1;
          continue;
        }

        this.events = [
          ...this.events.slice(0, index + quantity),
          ...this.events.slice(index + quantity + 1),
        ];

        return true;
      }
    }

    return false;
  }

  override insertEvent(dayEvent: DayEvent, index?: number) {


    this.#insert<Dragable>(this.#items, dayEvent.toDragDayEvent(), index);
    this.#insert<DayEvent>(this.events, dayEvent, index);

    this.removeExtraPlaceholdersAfterInsertion(
      index ?? this.events.length - 1,
      dayEvent.toDragDayEvent().getDuration(),
    );
  }

  override removeEvent(index: number) {
    const dragEvent = this.removeItem(index);

    this.addMissingPlaceholdersAfterRemoval(index, dragEvent.getDuration());
  }
  removeItem(index: number) {
    const dragEvent: Dragable = this.#items[index];

    this.#remove<Dragable>(this.#items, index);

    return dragEvent;
  }

  #insert<T>(array: T[], t: T, index?: number) {
    if (index != undefined)
      array = [...array.slice(0, index), t, ...array.slice(index)];
    else array = [...array, t];
  }

  #remove<T>(array: T[], index: number) {
    array = [...array.slice(0, index), ...array.slice(index + 1)];
  }


    getItems(){
    return this.#items;
  }
}
