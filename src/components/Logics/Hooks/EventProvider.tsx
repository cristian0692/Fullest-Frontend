import { createContext, useContext, useState } from "react";
import { makeTodayWithTime } from "@/Logics/Hooks/TimeProvider.tsx";
import type { Color, DayEvent } from "?/types.ts";

// 1. Define the context type
type EventContextType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  duration: Date;
  setDuration: React.Dispatch<React.SetStateAction<Date>>;
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>>;

  customEvents: DayEvent[];
  setCustomEvents: React.Dispatch<React.SetStateAction<DayEvent[]>>;
  eventGroups: Record<string, string[]>;
  setEventGroups: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
};

// 2. Create the context
const EventContext = createContext<EventContextType | null>(null);
// 3. Provider component
export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<Color>("bg-secondary");
  const [duration, setDuration] = useState(makeTodayWithTime(1, 0));
  const [customEvents, setCustomEvents] = useState<DayEvent[]>([]);
  const [eventGroups, setEventGroups] = useState<Record<string, string[]>>({});

  return (
    <EventContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        duration,
        setDuration,
        color,
        setColor,
        customEvents,
        setCustomEvents,
        eventGroups,
        setEventGroups,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// 4. Custom hook
export const useEvent = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used inside <EventProvider>");
  return ctx;
};
