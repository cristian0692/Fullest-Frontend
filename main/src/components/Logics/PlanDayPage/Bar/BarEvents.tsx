import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import SortableContainer from "./SortableArea.tsx";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";

const BAR_EVENTS_NAME = EVENT_CONTAINER_NAMES.barEvents;

const BarEvents = () => {
  const { eventContainers } = useEvent();

  return (
    <div className="flex items-start justify-start w-full">
      <SortableContainer
        id={BAR_EVENTS_NAME}
        items={eventContainers[BAR_EVENTS_NAME].getDragables()}
        rounded
        extraStyling="w-full"
      />
    </div>
  );
};

export default BarEvents;
