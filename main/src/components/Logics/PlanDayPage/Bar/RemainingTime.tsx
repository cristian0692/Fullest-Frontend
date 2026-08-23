import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import {
  calculateTimeInterval,
  getTimeMinutes,
  makeTodayWithTime,
  useTime,
} from "@/Logics/Hooks/TimeProvider.tsx";
import { findEventById } from "!/utils/events.ts";
import { EVENT_GROUP_NAMES } from "!/data/globalData.ts";
import type { DayEvent } from "?/types.ts";
import { useEffect, useState } from "react";

const calculateRemainingTime = (group: string[], events: DayEvent[]) => {
  return group.reduce<number>((acc, eventId) => {
    const customEvent = findEventById(events, eventId);
    if (!customEvent) {
      return acc;
    }
    acc += getTimeMinutes(customEvent.duration);
    return acc;
  }, 0);
};

const RemainingTime = () => {
  const { wakeTime, sleepTime, setRemainingTime } = useTime();
  const { eventGroups, customEvents } = useEvent();
  const [isDisplayError, setIsDisplayError] = useState(false);
  const [remainingTotalTime, setRemainingTotalTime] = useState("00:00"); //the text that is displayed
  const { isError, date: totalDayTime } = calculateTimeInterval(
    wakeTime,
    sleepTime,
  );
  const name = EVENT_GROUP_NAMES["barContent"];

  useEffect(() => {
    if (eventGroups[name]) {
      const totalMinutes = calculateRemainingTime(
        eventGroups[name],
        customEvents,
      );
      const totalHours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
      const totalTime: Date = makeTodayWithTime(totalHours, remainingMinutes);

      const result = calculateTimeInterval(
        totalTime,
        totalDayTime,
      );
      setRemainingTotalTime(result.text);
      setIsDisplayError(isError || result.isError);
      setRemainingTime(result.totalMinutes);
    }
  }, [eventGroups[name], wakeTime, sleepTime]);
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
