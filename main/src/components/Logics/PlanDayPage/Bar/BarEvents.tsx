import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import { useTime } from "@/Logics/Hooks/TimeProvider.tsx";
import SortableContainer from "./SortableArea.tsx";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
import { useEffect } from "react";
import { InsertionType, useDrag } from "../../Hooks/DragProvider.tsx";
import { RenderedBarContainer } from "!/domain/model/RenderedBarContainer.ts";

const BAR_EVENTS_NAME = EVENT_CONTAINER_NAMES.barContent;

const BarEvents = () => {
  const { eventContainers, setEventContainers } = useEvent();
  const { inserted, setInserted, quantityMoved } = useDrag();
  const renderedContainer: RenderedBarContainer = new RenderedBarContainer(
    eventContainers[BAR_EVENTS_NAME],
  );
  const { remainingTime } = useTime();

  useEffect(() => {
    setEventContainers({
      [EVENT_CONTAINER_NAMES.barEvents]: [],
      [EVENT_CONTAINER_NAMES.localEvents]: [],
    });
  }, []);

  useEffect(() => {
    if (inserted == null) {
      return;
    }
    switch (inserted) {
      case InsertionType.initialize:
        if (Number.isNaN(remainingTime)) { //remaining time has not been calculated yet
          break;
        }
        renderedContainer.fillEmptyBarWithPlaceholders(
          remainingTime,
        );
        setInserted(null);
        break;
      case InsertionType.in:
        renderedContainer.removeExtraPlaceholders(
          quantityMoved,
          remainingTime,
        );
        setInserted(null);

        break;
      case InsertionType.out:
        renderedContainer.addMissingPlaceholders(quantityMoved);
        setInserted(null);
        break;
    }
  }, [
    remainingTime,
    inserted,
    setInserted,
    renderedContainer.fillEmptyBarWithPlaceholders,
    renderedContainer.removeExtraPlaceholders,
    renderedContainer.addMissingPlaceholders,
  ]);

  return (
    <div className="flex items-start justify-start w-full">
      <SortableContainer
        id={BAR_EVENTS_NAME}
        items={renderedContainer.getItems()}
        rounded
        extraStyling="w-full"
      />
    </div>
  );
};

export default BarEvents;
