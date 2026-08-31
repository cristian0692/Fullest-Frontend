import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";
import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";

export const moveBetweenContainers = ({
  eventContainers,
  oldContainer,
  oldIndex,
  newContainer,
  newIndex: newIndex,
  item,
}: Props) => {
  return {
    ...eventContainers,
    [oldContainer.getName()]: oldContainer.removeItem(oldIndex),
    [newContainer.getName()]: newContainer.insertItem(item, newIndex),
  };
};

type Props = {
  eventContainers: Record<string, DayEventContainer<DayEvent>>;
  oldContainer: DayEventContainer<DragDayEvent>;
  oldIndex: number;
  newContainer: DayEventContainer<DragDayEvent>;
  newIndex: number;
  item: DragDayEvent;
};

export const arrayMove = (
  array: DragDayEvent[],
  oldIndex: number,
  newIndex: number,
) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
