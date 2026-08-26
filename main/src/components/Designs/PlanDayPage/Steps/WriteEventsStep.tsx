import StepsTemplate from "@/Designs/PlanDayPage/Steps/StepsTemplate.tsx";
import TimeInput from "@/Logics/Inputs/TimeInput.tsx";
import Heading from "@/Designs/PlanDayPage/Heading.tsx";
import ColorPicker from "@/Logics/ColorPicker/ColorPicker.tsx";
import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import type { DayEvent } from "?/types.ts";
import { makeTodayWithTime } from "@/Logics/Hooks/TimeProvider.tsx";
import EventList from "@/Logics/PlanDayPage/EventList.tsx";
import { useState } from "react";
import { useDrag } from "@/Logics/Hooks/DragProvider.tsx";
import { v4 as uuidv4 } from "uuid";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
type Props = {
  onPrevious: () => void;
  onNext: () => void;
};
const WriteEventsStep = ({ onPrevious, onNext }: Props) => {
  const {
    color,
    setColor,
    description,
    setDescription,
    title,
    setTitle,
    duration,
    setDuration,
    setDayEvents: setCustomEvents,
    setEventContainers: setEventGroups,
    eventContainers: eventGroups,
    dayEvents: customEvents,
  } = useEvent();

  const [showEvents, setShowEvents] = useState(false);
  const { setIsDraggable } = useDrag();
  const name = EVENT_CONTAINER_NAMES["localEvents"];

  const [titleError, setTitleError] = useState("");
  const localEvents = eventGroups[name] ? eventGroups[name] : [];
  const placedEvents = eventGroups["barEvents"] ? eventGroups["barEvents"] : [];
  const addCurrentEvent = () => {
    if (title == "") {
      setTitleError("Title is required");
      return;
    }
    const event: DayEvent = {
      id: uuidv4(),
      color,
      description,
      duration,
      title, // use the current values BEFORE clearing
    };
    setCustomEvents((prev) => [...prev, event]);

    setEventGroups((prev) => {
      const newEventId = event.id;
      const currentWowEvents = prev[name] || [];
      return {
        ...prev,
        [name]: [...currentWowEvents, newEventId],
      };
    });
    setDescription("");
    setDuration(makeTodayWithTime(1, 0));
    setTitle("");
  };

  return (
    <StepsTemplate number={2}>
      <Heading
        title="Events"
        description="Write the events you plan to do on this day"
      />
      {/* -------- Content ---------------- */}
      <div className="flex gap-10 md:flex-row flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="text-medium">
              Event Name<span className="text-primary">*</span>
            </div>
            <input
              className="bg-background text-medium px-2 rounded-xl h-14"
              type="text"
              maxLength={20}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError != "") setTitleError("");
              }}
            />
            <div className="text-red-500 font-bold pl-3">{titleError}</div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="text-medium flex flex-col">
              <div>Duration</div>
              <div className="w-0 -mb-6 text-normal font-normal">(hh:mm)</div>
            </div>
            <TimeInput
              color="transparent"
              max={6}
              isDuration
              value={duration}
              onChange={(time) => setDuration(time)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-medium">Description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-background text-medium px-2 rounded-xl max-h-100 min-h-15"
          />
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div>
            <div className="text-medium">Colors</div>
            <ColorPicker
              onSelect={(color) => setColor(color)}
              selectedColor={color}
            />
          </div>

          <button
            type="button"
            onClick={addCurrentEvent}
            className="bg-secondary py-3 rounded-xl hover:cursor-pointer"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* ------------- Lower Buttons ----------- */}
      <div className="w-full flex items-center justify-between md:flex-row flex-col gap-5">
        <button
          type="button"
          onClick={() => setShowEvents((prev) => !prev)}
          className="text-medium hover:underline hover:cursor-pointer"
        >
          {showEvents
            ? "Hide Events"
            : `See All Events (${
              customEvents.length ? customEvents.length : 0
            })`}
        </button>
        <div>
          <button
            type="button"
            onClick={onPrevious}
            className="self-end text-primary py-3 px-5 w-fit rounded-xl text-medium hover:cursor-pointer"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => {
              setIsDraggable(true);
              onNext();
            }}
            className="self-end bg-primary py-3 px-5 w-fit rounded-xl text-medium hover:cursor-pointer"
          >
            Next Step
          </button>
        </div>
      </div>
      {showEvents && (
        <div className="w-full flex flex-col items-center gap-3">
          <EventList events={customEvents} />
        </div>
      )}
    </StepsTemplate>
  );
};

export default WriteEventsStep;
