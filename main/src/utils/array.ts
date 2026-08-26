import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";

export const removeAtIndex = (array: DragDayEvent[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: DragDayEvent[], index: number, item: DragDayEvent) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (
  array: DragDayEvent[],
  oldIndex: number,
  newIndex: number,
) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
