import { createContext, useContext, useState } from "react";
import { Color } from "!/domain/model/enums/Color.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
import { RenderedContainer } from "!/domain/model/RenderedContainer.ts";
import { RenderType } from "!/domain/model/enums/RenderType.ts";
import { TimeValue } from "!/domain/model/TimeValue.ts";
import { RenderedBarContainer } from "!/domain/model/RenderedBarContainer.ts";

// 1. Define the context type
type EventContextType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  duration: TimeValue;
  setDuration: React.Dispatch<React.SetStateAction<TimeValue>>;
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>>;

  dayEvents: DayEvent[];
  setDayEvents: React.Dispatch<React.SetStateAction<DayEvent[]>>;
  eventContainers: Record<string, RenderedContainer>;
  setEventContainers: React.Dispatch<
    React.SetStateAction<Record<string, RenderedContainer>>
  >;
};

// 2. Create the context
export const EventContext = createContext<EventContextType | null>(null);
// 3. Provider component
export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<Color>("bg-secondary");
  const [duration, setDuration] = useState(new TimeValue(60));
  const [dayEvents, setDayEvents] = useState<DayEvent[]>([]);
  const [eventContainers, setEventContainers] = useState<
    Record<string, RenderedContainer>
  >({
    [EVENT_CONTAINER_NAMES.localEvents]: new RenderedContainer(
      EVENT_CONTAINER_NAMES.localEvents,
    ),
    [EVENT_CONTAINER_NAMES.barEvents]: new RenderedBarContainer(
      EVENT_CONTAINER_NAMES.barEvents,
      new TimeValue(0,18),
      new TimeValue(0,22)
    ),
  });

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
