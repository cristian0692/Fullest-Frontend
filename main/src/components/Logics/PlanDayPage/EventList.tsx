import { formatTime } from "@/Logics/Hooks/TimeProvider.tsx";
import { DayEvent } from "!/domain/model/DayEvent.ts";

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
              <div className={`w-5 h-5 ${event.GetColor()}`}></div>
              <div className="text-primary">Title:</div> {event.getTitle()}
            </div>
            <div className="flex gap-1">
              <div className="text-primary">Description:</div>{" "}
              {event.getDescription()}
            </div>
            <div className="flex gap-1">
              <div className="text-primary">Duration:</div>
              {formatTime(
                event.getDuration().getHours(),
                event.getDuration().getMinutes()
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EventList;
