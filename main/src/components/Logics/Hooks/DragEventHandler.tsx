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
import { arrayMove, insertAtIndex, removeAtIndex } from "!/utils/array.ts";

import { useEvent } from "./EventProvider.tsx";
import { findEventById } from "!/utils/events.ts";
import { InsertionType, useDrag } from "./DragProvider.tsx";
import { EVENT_CONTAINER_NAMES } from "../../../data/globalData.ts";
import { getTimeMinutes, useTime } from "./TimeProvider.tsx";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";

type Props = {
  children: ReactNode;
};

const DragEventHandler = ({ children }: Props) => {
  const { activeEvent, setActiveEvent } = useDrag();
  const { eventContainers: eventGroups, setEventContainers: setEventGroups, dayEvents: customEvents } = useEvent();
  const { setInserted, setQuantityMoved } = useDrag();
  const { remainingTime } = useTime();
  const [lastMove, setLastMove] = useState<
    { out: string; in: string; event: DayEvent } | null
  >(
    null,
  );
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
  }, [eventGroups, lastMove]);
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveEvent(findEventById(customEvents, active.id.toString()));
  };

  const handleDragCancel = () => setActiveEvent(null);

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;
    if (!overId || !active.data.current) {
      return;
    }
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    const activeIndex = active.data.current?.sortable.index;
    const overIndex = overId in eventGroups
      ? eventGroups[overContainer].length + 1
      : over.data.current?.sortable.index;

    if (activeContainer !== overContainer) {
      const currentEvent = findEventById(
        customEvents,
        eventGroups[activeContainer][activeIndex].getId(),
      );
      if (
        !currentEvent ||
        (!isRemainingTimeValid(currentEvent) &&
          overContainer == EVENT_CONTAINER_NAMES.barContent)
      ) {
        return;
      }
      setEventGroups((eventGroups) => {
        return moveBetweenContainers(
          {
            items: eventGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            item: currentEvent.toDragDayEvent(),
          },
        );
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
      const overIndex = over.id in eventGroups
        ? eventGroups[overContainer].length + 1
        : over.data.current?.sortable.index;
      setEventGroups((eventGroup) => {
        let newItems = eventGroup;
        if (activeContainer === overContainer) {
          newItems = {
            ...eventGroup,
            [overContainer]: arrayMove(
              eventGroup[overContainer],
              activeIndex,
              overIndex,
            ),
          };
        }

        return newItems;
      });
    }

    setActiveEvent(null);
  };

  type Props = {
    items: Record<string, DragDayEvent[]>;
    activeContainer: string;
    activeIndex: number;
    overContainer: string;
    overIndex: number;
    item: DragDayEvent;
  };
  const moveBetweenContainers = (
    { items, activeContainer, activeIndex, overContainer, overIndex, item }:
      Props,
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  const calculateInsertionType = (inContainer: string) => {
    const barContainerName = EVENT_CONTAINER_NAMES.barContent;
    const items = eventGroups[barContainerName];
    if (!items) {
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
        {activeEvent
          ? <CustomEvent customEvent={activeEvent} dragOverlay />
          : null}
      </DragOverlay>
      {children}
    </DndContext>
  );
};

export default DragEventHandler;
