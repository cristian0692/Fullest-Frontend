import { CiCirclePlus } from "react-icons/ci";
import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import Heading from "@/Designs/PlanDayPage/Heading.tsx";
import StepsTemplate from "@/Designs/PlanDayPage/Steps/StepsTemplate.tsx";
import { useDrag } from "@/Logics/Hooks/DragProvider.tsx";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
import SortableContainer from "../../../Logics/PlanDayPage/Bar/SortableArea.tsx";
import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
import { DragDayEvent } from "!/domain/model/dragables/DragDayEvent.ts";

type Props = {
  onPrevious: () => void;
  onComplete: () => void;
};
const PlaceEventsStep = ({ onComplete, onPrevious }: Props) => {
  const { eventContainers } = useEvent();
  const { setIsDraggable } = useDrag();

  const name = EVENT_CONTAINER_NAMES.localEvents;

  const localEvents = eventContainers[name] != null
    ? eventContainers[name].getItems().map((item) => item.toDragDayEvent())
    : new DayEventContainer<DragDayEvent>(EVENT_CONTAINER_NAMES.localEvents).getItems();
  return (
    <StepsTemplate number={3}>
      <Heading
        title="Place Events"
        description="Drag the events onto the Bar"
      />
      <div className="flex gap-5 h-auto items-center justify-end">
        <div className="overflow-x-scroll h-40 flex min-w-40">
          <SortableContainer
            id={name}
            items={localEvents}
            extraStyling={
              "gap-4 flex-nowrap " + (localEvents.length == 0 ? "w-max" : "")
            }
          />
        </div>
        <div
          onClick={() => {
            setIsDraggable(false);
            onPrevious();
          }}
          className="flex text-medium text-primary gap-3 items-center w-75"
        >
          <CiCirclePlus size={40} strokeWidth={1} /> Add More
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setIsDraggable(false);
            onPrevious();
          }}
          className="self-end text-primary py-3 px-5 w-fit rounded-xl text-medium hover:cursor-pointer"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            onComplete();
            setIsDraggable(false);
          }}
          className="self-end bg-primary py-3 px-5 w-fit rounded-xl text-medium hover:cursor-pointer"
        >
          Complete
        </button>
      </div>
    </StepsTemplate>
  );
};

export default PlaceEventsStep;
