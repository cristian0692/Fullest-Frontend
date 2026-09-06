import { Dragable } from "!/domain/model/dragables/Dragable.ts";
import { TimeValue } from "!/domain/model/TimeValue.ts";

export class BarPlaceholder extends Dragable {
  static DEFAULT_PLACEHOLDER_LENGTH = 15;
  constructor(id: string, duration?: TimeValue) {
    super(
      id,
      duration ?? new TimeValue(BarPlaceholder.DEFAULT_PLACEHOLDER_LENGTH),
    );
  }
  override getId() {
    return "placeholder-" + this.id;
  }
}
