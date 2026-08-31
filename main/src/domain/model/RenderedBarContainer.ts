import { BarPlaceholder } from "!/domain/model/BarPlaceHolder.ts";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";
import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
export class RenderedBarContainer extends DayEventContainer<
  BarPlaceholder | DragDayEvent
> {
  static PLACEHOLDER_DURATION = 15;
  static MAX_PlACEHOLDERS = 24 * (60 / this.PLACEHOLDER_DURATION);

  constructor(name: string, events?: DragDayEvent[]) {
    super(name, events ?? []);
  }

  insertUniquePlaceHolder() {
    for (let i = 0; i < RenderedBarContainer.MAX_PlACEHOLDERS; i++) {
      const id = "placeholder-" + i;
      if (!this.getAllPlaceHoldersId().includes(id)) {
        return new BarPlaceholder(i.toString());
      }
    }
    throw new Error("too many placeholders!");
  }

  getAllPlaceHoldersId() {
    return this.items
      .filter((barEvent) => barEvent instanceof BarPlaceholder)
      .map((barEvent) => barEvent.getId());
  }

  removeLastPlaceHolder() {
    const newRenderedContainer = [...this.items];
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
    this.items = newRenderedContainer;
  }

  addMissingPlaceholders(minutesRemoved: number) {
    const newRenderedContainer = [...this.items];

    for (let i = 0; i < minutesRemoved / 15; i++) {
      newRenderedContainer.push(this.insertUniquePlaceHolder());
    }
    this.items = newRenderedContainer;
  }

  fillEmptyBarWithPlaceholders(remainingTime: number) {
    const placeholderTotalTime = this.items.reduce((acc, currentValue) => {
      if (currentValue instanceof BarPlaceholder) {
        return acc + RenderedBarContainer.PLACEHOLDER_DURATION;
      } else return acc;
    }, 0);

    if (remainingTime >= placeholderTotalTime) {
      for (let i = 0; i < (remainingTime - placeholderTotalTime) / 15; i++) {
        this.items.push(this.insertUniquePlaceHolder());
      }
    } else {
      for (let i = 0; i < (placeholderTotalTime - remainingTime) / 15; i++) {
        this.removeLastPlaceHolder();
      }
    }
  }

  removeExtraPlaceholders(quantityMoved: number, remainingTime: number) {
    if (remainingTime < 0) {
      console.log("Not enough Time!");
      return [];
    }
    for (let i = 0; i < quantityMoved / 15; i++) {
      this.removeLastPlaceHolder();
    }
  }
}
