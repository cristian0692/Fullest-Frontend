import { DayEvent } from "!/domain/model/DayEvent.ts";

export class DayEventContainer<T = DayEvent> {
  protected items: T[];
  protected name: string;

  constructor(name: string ,items?: T[]) {
    this.name = name;
    this.items = items ?? [];
  }

  getItems() {
    return this.items;
  }

  getName(){
    return this.name;
  }

  removeItem = (index: number) => {
    return [...this.items.slice(0, index), ...this.items.slice(index + 1)];
  };

  insertItem = (item: T, index?: number) => {
    if (index != undefined)
      return [...this.items.slice(0, index), item, ...this.items.slice(index)];
    else return [...this.items, item];
  };
}
