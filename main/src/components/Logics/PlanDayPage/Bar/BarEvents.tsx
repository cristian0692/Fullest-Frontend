import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import { useTime } from "@/Logics/Hooks/TimeProvider.tsx";
import SortableArea from "./SortableArea.tsx";
import { EVENT_GROUP_NAMES } from "!/data/globalData.ts";
import { useEffect } from "react";
import { InsertionType, useDrag } from "../../Hooks/DragProvider.tsx";

const findUniquePlaceholder = (barEvents: string[]) => {
  for (let i = 0; i < 100; i++) { //100 placeholders because a day has max 24 hours and a placeholder is 15 min
    const placeholder = "placeholder-" + i;
    if (!barEvents.includes(placeholder)) {
      return placeholder;
    }
  }
  throw new Error("too many placeholders!");
};

const BarEvents = () => {
  const { eventGroups, setEventGroups } = useEvent();
  const { inserted, setInserted, quantityMoved } = useDrag();
  const { remainingTime } = useTime();
  const localEventsName = EVENT_GROUP_NAMES.localEvents;
  const barEventsName = EVENT_GROUP_NAMES.barContent;

  const barEvents: string[] = eventGroups[barEventsName];
  const addMissingPlaceholders = () => {
    const newBarEvents: string[] = [...barEvents];

    for (let i = 0; i < quantityMoved / 15; i++) {
      newBarEvents.push(findUniquePlaceholder(newBarEvents));
    }
    setEventGroups((prev) => {
      return { ...prev, [barEventsName]: newBarEvents };
    });
  };

  const removeLastPlaceHolder = (newBarEvents: string[]) => {
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
  const fillEmptyBarWithPlaceholders = () => {
    let newBarEvents: string[] = barEvents;
    const placeholderTotalTime = barEvents.reduce((acc, currentValue) => {
      if (currentValue.includes("placeholder")) return acc + 15;
      else return acc;
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
    // setCustomEvents([{
    //   color: "bg-amber-500",
    //   description: "",
    //   duration: makeTodayWithTime(3, 0),
    //   id: "401",
    //   title: "Gym",
    // }, {
    //   color: "bg-green-500",
    //   description: "",
    //   duration: makeTodayWithTime(1, 30),
    //   id: "378",
    //   title: "Work",
    // }, {
    //   color: "bg-primary",
    //   description: "",
    //   duration: makeTodayWithTime(1, 0),
    //   id: "490",
    //   title: "Cleaning",
    // }, {
    //   color: "bg-secondary",
    //   description: "",
    //   duration: makeTodayWithTime(2, 0),
    //   id: "361",
    //   title: "Rest",
    // }]);

    setEventGroups({
      [EVENT_GROUP_NAMES.barContent]: [],
      [localEventsName]: [/* 361", "378", "401", "490"*/],
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
        addMissingPlaceholders();
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