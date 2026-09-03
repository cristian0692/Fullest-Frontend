import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";
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
  try{
  newContainer.insertEvent(item, newIndex);
  oldContainer.removeEvent(oldIndex);
  return false;
  }catch(e){
    console.error(e);
    return true;
  }

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
