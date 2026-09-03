import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import { useTime } from "@/Logics/Hooks/TimeProvider.tsx";
import SortableContainer from "./SortableArea.tsx";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
import { useEffect, useState } from "react";
import { RenderedContainer } from "!/domain/model/RenderedContainer.ts";

const BAR_EVENTS_NAME = EVENT_CONTAINER_NAMES.barEvents;

const BarEvents = () => {
  const { eventContainers } = useEvent();
  const { remainingTime } = useTime();
  const [initalized, setInitialized] = useState(false);
  useEffect(() => {
    if (initalized || Number.isNaN(remainingTime)) return;

    const barEventsContainer = eventContainers[EVENT_CONTAINER_NAMES.barEvents];
    if (!(barEventsContainer instanceof RenderedContainer)) {
      console.error("Failed to convert to RenderedBarContainer");
      return;
    }

    const renderedBarContainer = barEventsContainer as RenderedContainer;

    renderedBarContainer.fillEmptyBarWithPlaceholders(remainingTime);

    setInitialized(true);
  }, [remainingTime]);

  return (
    <div className="flex items-start justify-start w-full">
      <SortableContainer
        id={BAR_EVENTS_NAME}
        items={eventContainers[BAR_EVENTS_NAME].getItems()}
        rounded
        extraStyling="w-full"
      />
    </div>
  );
};

export default BarEvents;
