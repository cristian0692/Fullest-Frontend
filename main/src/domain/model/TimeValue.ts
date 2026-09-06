export class TimeValue {
  constructor(minutes: number, hours?: number) {
    this.#totalMinutes = minutes;

    this.#totalMinutes += hours ?? 0;
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
  add(minutes: number) {
    this.#totalMinutes += minutes;
  }

  substract(minutes: number) {
    this.#totalMinutes -= minutes;
  }

  #totalMinutes: number;
}
