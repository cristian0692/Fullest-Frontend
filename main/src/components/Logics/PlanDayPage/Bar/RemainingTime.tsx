import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import {
  calculateTimeInterval,
  useTime,
} from "@/Logics/Hooks/TimeProvider.tsx";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
import { useEffect, useState } from "react";
import { DragDayEvent } from "!/domain/model/dragables/DragDayEvent.ts";
import { TimeValue } from "!/domain/model/TimeValue.ts";

const calculateTotalEventTime = (barEvents: DragDayEvent[]) => {
  return barEvents.reduce<number>((acc, barEvent) => {
    return acc + barEvent.getDurationInMinutes();
  }, 0);
};

const RemainingTime = () => {
  const { wakeTime, sleepTime, setRemainingTime } = useTime();
  const { eventContainers } = useEvent();
  const [isDisplayError, setIsDisplayError] = useState(false);
  const [remainingTotalTime, setRemainingTotalTime] = useState("00:00"); //the text that is displayed
  const totalDayTime = calculateTimeInterval(wakeTime, sleepTime);
  const name = EVENT_CONTAINER_NAMES.barEvents;

  useEffect(() => {
    const totalMinutes = calculateTotalEventTime(
      eventContainers[name].getEvents().map((item) => item.toDragDayEvent()) ??
        [],
    );
    const totalTime: TimeValue = new TimeValue(totalMinutes);

    const result = calculateTimeInterval(totalTime, totalDayTime);
    setRemainingTotalTime(result.toString());
    setIsDisplayError(result.getTotalMinutes() < 0);
    setRemainingTime(result.getTotalMinutes());
  }, [eventContainers[name].getItems().length, wakeTime, sleepTime]);
  return (
    <div
      className={`flex flex-col items-center ${
        isDisplayError ? "text-red-500" : "text-white"
      }`}
    >
      {remainingTotalTime}
      <div className="text-normal font-normal">Time Remaining</div>
    </div>
  );
};

export default RemainingTime;
