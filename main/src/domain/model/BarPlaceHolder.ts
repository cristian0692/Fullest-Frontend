export class BarPlaceholder {
  constructor(id: string) {
    this.#id = id;
  }
  getId() {
    return "placeholder-" + this.#id;
  }

  #id: string;
}