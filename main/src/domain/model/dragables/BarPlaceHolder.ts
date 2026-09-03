import { Dragable } from "!/domain/model/dragables/Dragable.ts";

export class BarPlaceholder extends Dragable {
  static DEFAULT_PLACEHOLDER_LENGTH = 15;
  constructor(id: string, durationInMinutes?: number) {
    super(id, durationInMinutes ?? BarPlaceholder.DEFAULT_PLACEHOLDER_LENGTH);
  }
  override getId() {
    return "placeholder-" + this.id;
  }
}
