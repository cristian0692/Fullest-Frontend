import { DayEvent } from "!/domain/model/DayEvent.ts";

export class DayEventContainer<T = DayEvent> {
  protected items: T[];
  protected name: string;

  constructor(name: string, items?: T[]) {
    this.name = name;
    this.items = items ?? [];
  }

  getItems() {
    return this.items;
  }

  getName() {
    return this.name;
  }

  countItemsOfSameTypeBeforeIndex(
    index: number,
    referenceItem: T = this.items[index],
  ) {
    let count = 0;
    for (let i = 0; i < index; i++) {
      if (this.items[i]?.constructor === referenceItem?.constructor) count++;
    }
    return count;
  }

  insertItem(item: T, index?: number) {
    if (index != undefined)
      this.items = [
        ...this.items.slice(0, index),
        item,
        ...this.items.slice(index),
      ];
    else this.items = [...this.items, item];
  }

  removeItem(index: number) {
    this.items = [
      ...this.items.slice(0, index),
      ...this.items.slice(index + 1),
    ];
  }
}
