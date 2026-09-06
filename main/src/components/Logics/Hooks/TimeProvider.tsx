import { createContext, useContext, useState } from "react";
import { TimeValue } from "!/domain/model/TimeValue.ts";

export const formatTime = (hours: number, minutes: number) => {
  return (
    <>
      {hours}:{minutes.toString().padStart(2, "0")}
    </>
  );
};
export const calculateTimeInterval = (
  smallValue: TimeValue,
  bigValue: TimeValue,
) => {
  const newTime = bigValue.clone();
  newTime.substractTimeValue(smallValue);

  return newTime;
};

// 1. Define the context type
type TimeContextType = {
  wakeTime: TimeValue;
  setWakeTime: React.Dispatch<React.SetStateAction<TimeValue>>;
  sleepTime: TimeValue;
  setSleepTime: React.Dispatch<React.SetStateAction<TimeValue>>;
  timeSegments: number;
  setTimeSegments: React.Dispatch<React.SetStateAction<number>>;
  remainingTime: number; //minutes
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
};

// 2. Create the context
const TimeContext = createContext<TimeContextType | null>(null);

// 3. Provider component
export const TimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [wakeTime, setWakeTime] = useState(() => new TimeValue(0, 18));
  const [sleepTime, setSleepTime] = useState(() => new TimeValue(0, 22));
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
