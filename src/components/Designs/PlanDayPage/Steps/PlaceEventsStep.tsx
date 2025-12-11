import { CiCirclePlus } from "react-icons/ci";
import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import Heading from "@/Designs/PlanDayPage/Heading.tsx";
import StepsTemplate from "@/Designs/PlanDayPage/Steps/StepsTemplate.tsx";
import { useDrag } from "@/Logics/Hooks/DragProvider.tsx";
import { EVENT_GROUP_NAMES } from "!/data/globalData.ts";
import SortableArea from "../../../Logics/PlanDayPage/Bar/SortableArea.tsx";

type Props = {
  onPrevious: () => void;
  onComplete: () => void;
};
const PlaceEventsStep = ({ onComplete, onPrevious }: Props) => {
  const { eventGroups } = useEvent();
  const { setIsDraggable } = useDrag();

  const name = EVENT_GROUP_NAMES["localEvents"];

  const localEvents = eventGroups[name] ? eventGroups[name] : [];

  return (
    <StepsTemplate number={3}>
      <Heading
        title="Place Events"
        description="Drag the events onto the Bar"
      />
      <div className="flex gap-5 h-auto items-center justify-end">
        <div className="overflow-x-scroll h-40 flex min-w-40">
          <SortableArea
            id={name}
            items={localEvents}
            extraStyling={"gap-4 flex-nowrap " +
              (localEvents.length == 0 ? "w-max" : "")}
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
