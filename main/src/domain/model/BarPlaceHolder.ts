export class BarPlaceholder {
  constructor(id: string) {
    this.#id = id;
  }
  getId() {
    return this.#id;
  }

  #id: string;
}