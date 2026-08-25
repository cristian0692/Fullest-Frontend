import { createContext, useContext, useState } from "react";

// helper to create today's date with specific time
export const makeTodayWithTime = (hours: number, minutes: number) => {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
};

export const formatTime = (hours: number, minutes: number) => {
  return (
    <>
      {hours}:{minutes.toString().padStart(2, "0")}
    </>
  );
};
export const getTimeMinutes = (time: Date) => {
  return time.getHours() * 60 + time.getMinutes();
};
export const calculateTimeInterval = (startTime: Date, endTime: Date) => {
  const milliDiff = endTime.getTime() - startTime.getTime();
  const totalMinutes = Math.floor(milliDiff / (60 * 1000));
  const remMinutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);

  const isError = totalHours + remMinutes / 60 < 0;

  return {
    text: `${totalHours}:${remMinutes.toString().padStart(2, "0")}`,
    date: makeTodayWithTime(totalHours, remMinutes),
    hours: totalHours,
    minutes: remMinutes,
    totalMinutes: totalMinutes,
    isError,
  };
};

// 1. Define the context type
type TimeContextType = {
  wakeTime: Date;
  setWakeTime: React.Dispatch<React.SetStateAction<Date>>;
  sleepTime: Date;
  setSleepTime: React.Dispatch<React.SetStateAction<Date>>;
  timeSegments: number;
  setTimeSegments: React.Dispatch<React.SetStateAction<number>>;
  remainingTime: number; //minutes
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
};

// 2. Create the context
const TimeContext = createContext<TimeContextType | null>(null);

// 3. Provider component
export const TimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [wakeTime, setWakeTime] = useState(() => makeTodayWithTime(18, 0));
  const [sleepTime, setSleepTime] = useState(() => makeTodayWithTime(22, 0));
  const [timeSegments, setTimeSegments] = useState(0);
  const [remainingTime, setRemainingTime] = useState(NaN);

  return (
    <TimeContext.Provider
      value={{
        wakeTime,
        setWakeTime,
        sleepTime,
        setSleepTime,
        setTimeSegments,
        timeSegments,
        remainingTime,
        setRemainingTime,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

// 4. Custom hook
export const useTime = () => {
  const ctx = useContext(TimeContext);
  if (!ctx) throw new Error("useTime must be used inside <TimeProvider>");
  return ctx;
};
