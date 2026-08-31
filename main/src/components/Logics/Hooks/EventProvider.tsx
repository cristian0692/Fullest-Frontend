import { createContext, useContext, useState } from "react";
import { makeTodayWithTime } from "@/Logics/Hooks/TimeProvider.tsx";
import { Color } from "!/domain/model/enums/Color.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";

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

  dayEvents: DayEvent[];
  setDayEvents: React.Dispatch<React.SetStateAction<DayEvent[]>>;
  eventContainers: Record<string, DragDayEvent[]>;
  setEventContainers: React.Dispatch<
    React.SetStateAction<Record<string, DragDayEvent[]>>
  >;
};

// 2. Create the context
export const EventContext = createContext<EventContextType | null>(null);
// 3. Provider component
export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<Color>("bg-secondary");
  const [duration, setDuration] = useState(makeTodayWithTime(1, 0));
  const [dayEvents, setDayEvents] = useState<DayEvent[]>([]);
  const [eventContainers, setEventContainers] = useState<
    Record<string, DragDayEvent[]>
  >({});

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
        dayEvents,
        setDayEvents,
        eventContainers,
        setEventContainers,
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
