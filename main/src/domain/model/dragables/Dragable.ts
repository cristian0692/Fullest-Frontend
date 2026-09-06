import { TimeValue } from "!/domain/model/TimeValue.ts";

export class Dragable {
  constructor(id: string, duration: TimeValue) {
    this.id = id;
    this.duration = duration;
  }
  getId() {
    return this.id;
  }

  getDuration() {
    return this.duration;
  }

    getDurationInMinutes() {
    return this.duration.getTotalMinutes();
  }
  protected duration: TimeValue;
  protected id: string;
}
