import type { DayEvent } from "?/types.ts";

type Props = {
  customEvent: DayEvent;
  dragOverlay?: boolean;
  first?: boolean; //to round the left corner
  last?: boolean; //to round the right corner
};

const CustomEvent = (
  { customEvent, dragOverlay = false, first = false, last = false }: Props,
) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div
      style={style}
      className={`${customEvent.color} h-full flex items-center p-2 text-white justify-center ${
        first ? "rounded-l-full" : "rounded-l-none"
      } ${last ? "rounded-r-full" : "rounded-r-none"}`}
    >
      {customEvent.title}
    </div>
  );
};

export default CustomEvent;
