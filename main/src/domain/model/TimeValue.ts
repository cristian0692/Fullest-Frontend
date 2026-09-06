import { time } from "node:console";

export class TimeValue {
  constructor(minutes: number, hours?: number) {
    this.#totalMinutes = minutes;

    this.#totalMinutes += (hours ?? 0) * 60;
  }

  getMinutes() {
    return this.#totalMinutes % 60;
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

  
  clone(): TimeValue {
    return new TimeValue(this.#totalMinutes);
  }
  #totalMinutes: number;
}
