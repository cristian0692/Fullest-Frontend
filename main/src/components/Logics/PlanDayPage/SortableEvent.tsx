import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CustomEvent from "./CustomEvent.tsx";
import { useEvent } from "../Hooks/EventProvider.tsx";
import { barBorder, barHeight } from "!/data/globalData.ts";
import { useDrag } from "../Hooks/DragProvider.tsx";
import { useEventWidth } from "../Hooks/EventWidthProvider.tsx";
import { getTimeMinutes } from "../Hooks/TimeProvider.tsx";
import { DayEvent } from "!/domain/model/DayEvent.ts";

type Props = {
  eventId: string;
  first?: boolean;
  last?: boolean;
};

const SortableEvent = (
  { eventId, first = false, last = false }: Props,
) => {
  const isPlaceholder = eventId ? eventId.includes("placeholder") : true;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: eventId, disabled: isPlaceholder });

  const { dayEvents: customEvents } = useEvent();
  const { activeEvent } = useDrag();
  const { pixelsPer15Minutes } = useEventWidth();
  const currentEvent =  DayEvent.findEventById(customEvents, eventId);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    width: (pixelsPer15Minutes) + "px",
    // Use the calculated width based on event data
    maxHeight: (barHeight - (barBorder * 2)) + "px",
  };
  if (isPlaceholder) {
    return (
      <li
        style={style}
        className="h-full bg-background border-1 border-black"
        id={eventId}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
      </li>
    );
  }

  if (!currentEvent) {
    return;
  }

  const eventWidth = `${
    getTimeMinutes(currentEvent.getDuration()) * pixelsPer15Minutes / 15
  }px`;
  style.width = eventWidth;
  return (
    <li
      style={style}
      className="h-full"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <CustomEvent
        customEvent={currentEvent}
        first={first && activeEvent == null}
        last={last && activeEvent == null}
      />
    </li>
  );
};

export default SortableEvent;
