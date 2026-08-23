import { formatTime } from "@/Logics/Hooks/TimeProvider.tsx";
import type { DayEvent } from "?/types.ts";

type Props = {
  events: DayEvent[];
};

const EventList = ({ events }: Props) => {
  return (
    <>
      {events.map((event, i) => {
        return (
          <div
            key={i}
            className="w-full bg-background grid grid-cols-3 gap-4 p-3 rounded-lg"
          >
            <div className="flex gap-1">
              <div className={`w-5 h-5 ${event.color}`}></div>
              <div className="text-primary">Title:</div> {event.title}
            </div>
            <div className="flex gap-1">
              <div className="text-primary">Description:</div>{" "}
              {event.description}
            </div>
            <div className="flex gap-1">
              <div className="text-primary">Duration:</div>
              {formatTime(
                event.duration.getHours(),
                event.duration.getMinutes()
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EventList;
