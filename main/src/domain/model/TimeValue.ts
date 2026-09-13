import { time } from "node:console";

export class TimeValue {
  constructor(minutes: number, hours?: number) {
    this.#totalMinutes = minutes;

    this.#totalMinutes += (hours ?? 0) * 60;
  }

  getMinutes() {
    return Math.abs(this.#totalMinutes % 60);
  }

  getHour() {
    return Math.floor(this.#totalMinutes / 60);
  }

  getTotalMinutes() {
    return this.#totalMinutes;
  }

  toString() {
    const hours = this.getHour().toString().padStart(2, "0");
    const minutes = this.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  addMinutes(minutes: number) {
    this.#totalMinutes += minutes;
  }

  addTimeValue(timeValue: TimeValue) {
    this.#totalMinutes += timeValue.getTotalMinutes();
  }

  substractMinutes(minutes: number) {
    this.#totalMinutes -= minutes;
  }

  substractTimeValue(timeValue: TimeValue) {
    this.#totalMinutes -= timeValue.getTotalMinutes();
  }

  static substract(timeValue: TimeValue, timeValue2: TimeValue) {
    return new TimeValue(
      timeValue.getTotalMinutes() - timeValue2.getTotalMinutes(),
    );
  }

  static add(timeValue: TimeValue, timeValue2: TimeValue) {
    return new TimeValue(
      timeValue.getTotalMinutes() + timeValue2.getTotalMinutes(),
    );
  }

  static addMinutes(timeValue: TimeValue, minutes: number) {
    return new TimeValue(timeValue.getTotalMinutes() + minutes);
  }

  static substractMinutes(timeValue: TimeValue, minutes: number) {
    return new TimeValue(timeValue.getTotalMinutes() - minutes);
  }

  clone(): TimeValue {
    return new TimeValue(this.#totalMinutes);
  }
  #totalMinutes: number;
}
