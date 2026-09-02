import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import { useTime } from "@/Logics/Hooks/TimeProvider.tsx";
import SortableContainer from "./SortableArea.tsx";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
import { useEffect } from "react";
import { InsertionType, useDrag } from "../../Hooks/DragProvider.tsx";
import { RenderedBarContainer } from "!/domain/model/RenderedBarContainer.ts";

const BAR_EVENTS_NAME = EVENT_CONTAINER_NAMES.barContent;

const BarEvents = () => {
  const { setEventContainers } = useEvent();
  const {
    inserted,
    setInserted,
    quantityMoved,
    dragContainers  } = useDrag();
  const { remainingTime } = useTime();


  useEffect(() => {
    if (inserted == null) {
      return;
    }
    const barEventsContainer = dragContainers[EVENT_CONTAINER_NAMES.barEvents];
    if (!(barEventsContainer instanceof RenderedBarContainer)) {
      console.error("Failed to convert to RenderedBarContainer");
      return;
    }

    const renderedBarContainer = barEventsContainer as RenderedBarContainer;

    switch (inserted) {
      case InsertionType.initialize:
        if (Number.isNaN(remainingTime)) {
          //remaining time has not been calculated yet
          break;
        }

        renderedBarContainer.fillEmptyBarWithPlaceholders(remainingTime);
        setInserted(null);
        break;
      case InsertionType.in:
        renderedBarContainer.removeExtraPlaceholdersAfterInsertion(
          0,
          quantityMoved,
        );
        setInserted(null);

        break;
      case InsertionType.out:
        renderedBarContainer.addMissingPlaceholdersAfterRemoval(
          0,
          quantityMoved,
        );
        setInserted(null);
        break;
    }
  }, [remainingTime, inserted, setInserted]);

  return (
    <div className="flex items-start justify-start w-full">
      <SortableContainer
        id={BAR_EVENTS_NAME}
        items={dragContainers[BAR_EVENTS_NAME].getItems()}
        rounded
        extraStyling="w-full"
      />
    </div>
  );
};

export default BarEvents;
