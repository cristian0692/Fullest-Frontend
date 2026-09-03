import { ReactNode, useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import CustomEvent from "@/Logics/PlanDayPage/CustomEvent.tsx";
import { arrayMove, moveBetweenContainers } from "!/utils/array.ts";

import { useEvent } from "./EventProvider.tsx";
import { InsertionType, useDrag } from "./DragProvider.tsx";
import { EVENT_CONTAINER_NAMES } from "../../../data/globalData.ts";
import { getTimeMinutes, useTime } from "./TimeProvider.tsx";
import { DayEvent } from "!/domain/model/DayEvent.ts";

type Props = {
  children: ReactNode;
};

const DragEventHandler = ({ children }: Props) => {
  const { activeEvent, setActiveEvent } = useDrag();
  const {
    eventContainers,
    setEventContainers,
    dayEvents: customEvents,
  } = useEvent();
  const { setInserted, setQuantityMoved } = useDrag();
  const { remainingTime } = useTime();
  const [lastMove, setLastMove] = useState<{
    out: string;
    in: string;
    event: DayEvent;
  } | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  useEffect(() => {
    if (lastMove) {
      calculateInsertionType(lastMove.in);
      setLastMove(null); // Reset the trigger
    }
  }, [eventContainers, lastMove]);
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveEvent(DayEvent.findEventById(customEvents, active.id.toString()));
  };

  const handleDragCancel = () => setActiveEvent(null);

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;
    if (!overId || !active.data.current) {
      return;
    }
    const activeContainer = active.data.current?.sortable?.containerId as string;
    const overContainer =
      over.data.current?.sortable?.containerId || (over.id as string);
    const activeIndex = active.data.current?.sortable?.index as number;
    const overIndex = over.data.current?.sortable?.index as number;

    if (activeContainer !== overContainer) {
      const currentEvent = DayEvent.findEventById(
        customEvents,
        eventContainers[activeContainer].getItems()[activeIndex].getId(),
      );
      if (
        !currentEvent ||
        (!isRemainingTimeValid(currentEvent) &&
          overContainer == EVENT_CONTAINER_NAMES.barEvents)
      ) {
        return;
      }
      moveBetweenContainers({
        eventContainers,
        oldContainer: eventContainers[activeContainer],
        oldIndex: activeIndex,
        newContainer: eventContainers[overContainer],
        newIndex: overIndex,
        item: currentEvent.toDragDayEvent(),
      });

      if (currentEvent) {
        setQuantityMoved(getTimeMinutes(currentEvent.getDuration()));
        setLastMove({
          out: activeContainer,
          in: overContainer,
          event: currentEvent,
        });
      }
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || !active.data.current) {
      setActiveEvent(null);
      return;
    }
    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in eventContainers
          ? eventContainers[overContainer].getItems().length + 1
          : over.data.current?.sortable.index;

      dragContainers[overContainer].setItems(
        arrayMove(
          dragContainers[overContainer].getItems(),
          activeIndex,
          overIndex,
        )
      );
    }

    setActiveEvent(null);
  };

  const calculateInsertionType = (inContainer: string) => {
    const barContainerName = EVENT_CONTAINER_NAMES.barEvents;
    const items = eventContainers[barContainerName].getItems();
    if (items.length === 0) {
      console.error("contents of the bar not found!");
      return;
    }
    if (insertingIntoContainer(inContainer, barContainerName)) {
      setInserted(InsertionType.in);
    } else {
      setInserted(InsertionType.out);
    }
  };
  const insertingIntoContainer = (
    inContainer: string,
    barContainerName: string,
  ): boolean => {
    return inContainer === barContainerName;
  };

  const isRemainingTimeValid = (newEvent: DayEvent) => {
    return remainingTime - getTimeMinutes(newEvent.getDuration()) >= 0;
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <DragOverlay>
        {activeEvent ? (
          <CustomEvent customEvent={activeEvent} dragOverlay />
        ) : null}
      </DragOverlay>
      {children}
    </DndContext>
  );
};

export default DragEventHandler;
