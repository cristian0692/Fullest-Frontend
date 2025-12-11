import { createContext, useContext, useState } from "react";
import { calculateTimeInterval } from "./TimeProvider.tsx";
// 1. Define the context type
type EventWidthContextType = {
  barWidth: number;
  setBarWidth: React.Dispatch<React.SetStateAction<number>>;
  pixelsPer15Minutes: number;
  setPixelPer15Minutes: React.Dispatch<React.SetStateAction<number>>;
};

// 2. Create the context
const EventWidthContext = createContext<EventWidthContextType | null>(null);

// 3. Provider component
export const EventWidthProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [barWidth, setBarWidth] = useState(0); // Width of the bar based on the time capacity
  const [pixelPer15Minutes, setPixelPer15Minutes] = useState(0);
  return (
    <EventWidthContext.Provider
      value={{
        barWidth,
        setBarWidth,
        pixelsPer15Minutes: pixelPer15Minutes,
        setPixelPer15Minutes,
      }}
    >
      {children}
    </EventWidthContext.Provider>
  );
};

// 4. Custom hook
export const useEventWidth = () => {
  const ctx = useContext(EventWidthContext);
  if (!ctx) throw new Error("useEventWidth must be used inside <TimeProvider>");
  return ctx;
};

export const calculatePixelPer15Minutes = (
  startTime: Date,
  endTime: Date,
  barWidth: number,
) => {
  const { hours, minutes, isError } = calculateTimeInterval(startTime, endTime);

  if (isError) {
    return 0;
  }
  return barWidth / ((hours * 60 + minutes) / 15);
};
