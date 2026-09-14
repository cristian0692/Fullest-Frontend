import { DayEvent } from "!/domain/model/DayEvent.ts";

export class DayEventDto {
  constructor(
    id: string,
    name: string,
    startTime: string,
    endTime: string,
    color: string,
    description?: string,
  ) {
    this.id = id;
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.color = color;
    this.description = description ?? "";
  }
  static toDto(dayEvent: DayEvent) {
    const startTime = dayEvent.getStartTime();
    if (startTime == undefined) {
      throw new Error("start Time must not be null on save");
    }
    return new DayEventDto(
      dayEvent.getId(),
      dayEvent.getTitle(),
      startTime.toString(),
      dayEvent.getEndTime().toString(),
      dayEvent.GetColor(),
      dayEvent.getDescription(),
    );
  }
  id: string;
  name: string;
  color: string;
  description: string;
  startTime: string;
  endTime: string;
}
