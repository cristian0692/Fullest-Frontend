import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";
import { DragDayEvent } from "!/domain/model/dragables/DragDayEvent.ts";
import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { Dragable } from "!/domain/model/dragables/Dragable.ts";
import { RenderedContainer } from "!/domain/model/RenderedContainer.ts";

export const moveBetweenContainers = ({
  oldContainer,
  oldIndex,
  newContainer,
  newIndex,
  item,
}: Props) => {
  oldContainer.removeItem(oldIndex);
  newContainer.insertEvent(item, newIndex);
};

type Props = {
  oldContainer: RenderedContainer;
  oldIndex: number;
  newContainer: RenderedContainer;
  newIndex: number;
  item: DayEvent;
};

export const arrayMove = (
  array: Dragable[],
  oldIndex: number,
  newIndex: number,
) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
