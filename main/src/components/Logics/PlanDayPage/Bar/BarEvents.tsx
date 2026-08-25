import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import { useTime } from "@/Logics/Hooks/TimeProvider.tsx";
import SortableArea from "./SortableArea.tsx";
import { EVENT_GROUP_NAMES } from "!/data/globalData.ts";
import { useEffect } from "react";
import { InsertionType, useDrag } from "../../Hooks/DragProvider.tsx";

const PLACEHOLDER_DURATION = 15;
const MAX_PlACEHOLDERS = 24 * (60 / PLACEHOLDER_DURATION);
const BAR_EVENTS_NAME = EVENT_GROUP_NAMES.barContent;

const findUniquePlaceholder = (barEvents: string[]) => {
  for (let i = 0; i < MAX_PlACEHOLDERS; i++) {
    const placeholder = "placeholder-" + i;
    if (!barEvents.includes(placeholder)) {
      return placeholder;
    }
  }
  throw new Error("too many placeholders!");
};
export const removeLastPlaceHolder = (barEvents: string[]) => {
  const newBarEvents = [...barEvents];
  let j = newBarEvents.length - 1;
  while (j >= 0) {
    const currentEvent = newBarEvents[j];
    if (currentEvent.includes("placeholder")) {
      newBarEvents.splice(j, 1);
      break;
    } else {
      j -= 1;
    }
  }
  return newBarEvents;
};

export const addMissingPlaceholders = (
  barEvents: string[],
  quantityMoved: number,
) => {
  const newBarEvents: string[] = [...barEvents];

  for (let i = 0; i < quantityMoved / 15; i++) {
    newBarEvents.push(findUniquePlaceholder(newBarEvents));
  }
  return newBarEvents;
};

const BarEvents = () => {
  const { eventGroups, setEventGroups } = useEvent();
  const { inserted, setInserted, quantityMoved } = useDrag();
  const { remainingTime } = useTime();
  const localEventsName = EVENT_GROUP_NAMES.localEvents;

  const barEvents: string[] = eventGroups[BAR_EVENTS_NAME];

  const fillEmptyBarWithPlaceholders = () => {
    let newBarEvents: string[] = barEvents;
    const placeholderTotalTime = barEvents.reduce((acc, currentValue) => {
      if (currentValue.includes("placeholder")) {
        return acc + PLACEHOLDER_DURATION;
      } else return acc;
    }, 0);

    if (remainingTime >= placeholderTotalTime) {
      for (let i = 0; i < (remainingTime - placeholderTotalTime) / 15; i++) {
        newBarEvents.push(findUniquePlaceholder(newBarEvents)); // push at the end
      }
    } else {
      for (let i = 0; i < (placeholderTotalTime - remainingTime) / 15; i++) {
        newBarEvents = removeLastPlaceHolder(newBarEvents);
      }
    }

    setEventGroups((prev) => {
      return { ...prev, [barEventsName]: newBarEvents };
    });
  };

  const removeExtraPlaceholders = () => {
    if (remainingTime < 0) {
      console.log("Not enough Time!");
      return;
    }
    let newBarEvents = [...barEvents];
    for (let i = 0; i < quantityMoved / 15; i++) {
      newBarEvents = removeLastPlaceHolder(newBarEvents);
    }

    setEventGroups((prev) => {
      return { ...prev, [barEventsName]: newBarEvents };
    });
  };
  useEffect(() => {
    setEventGroups({
      [EVENT_GROUP_NAMES.barContent]: [],
      [localEventsName]: [],
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
        fillEmptyBarWithPlaceholders();
        setInserted(null);
        break;
      case InsertionType.in:
        removeExtraPlaceholders();
        setInserted(null);

        break;
      case InsertionType.out:
        setEventGroups((prev) => {
          return {
            ...prev,
            [BAR_EVENTS_NAME]: addMissingPlaceholders(barEvents, quantityMoved),
          };
        });

        setInserted(null);
        break;
    }
  }, [
    remainingTime,
    inserted,
    setInserted,
    fillEmptyBarWithPlaceholders,
    removeExtraPlaceholders,
    addMissingPlaceholders,
  ]);

  return (
    <div className="flex items-start justify-start w-full">
      <SortableArea
        id={barEventsName}
        items={eventGroups[barEventsName]}
        rounded
        extraStyling="w-full"
      />
    </div>
  );
};

export default BarEvents;
