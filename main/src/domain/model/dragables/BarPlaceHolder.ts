import { Dragable } from "!/domain/model/dragables/Dragable.ts";

export class BarPlaceholder extends Dragable {
  constructor(id: string) {
    super(id);
  }
 override  getId() {
    return "placeholder-" + this.id;
  }
}
