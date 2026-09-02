import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";
import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { RenderedBarContainer } from "!/domain/model/RenderedBarContainer.ts";
import { BarPlaceholder } from "!/domain/model/BarPlaceHolder.ts";

export const moveBetweenContainers = ({
  eventContainers,
  oldContainer,
  oldIndex,
  newContainer,
  newIndex,
  item,
}: Props) => {
  const realEventOldIndex =
    oldContainer.countItemsOfSameTypeBeforeIndex(oldIndex); // before removal

  oldContainer.removeItem(oldIndex);
  newContainer.insertItem(item, newIndex);

  const realEventNewIndex =
    newContainer.countItemsOfSameTypeBeforeIndex(newIndex); // after insertion

  const dayEvent: DayEvent =
    eventContainers[oldContainer.getName()].getItems()[realEventOldIndex];

  eventContainers[newContainer.getName()].insertItem(
    dayEvent,
    realEventNewIndex,
  );
  eventContainers[oldContainer.getName()].removeItem(realEventOldIndex);
};

type Props = {
  eventContainers: Record<string, DayEventContainer<DayEvent>>;
  oldContainer: DayEventContainer<DragDayEvent> | RenderedBarContainer;
  oldIndex: number;
  newContainer: DayEventContainer<DragDayEvent> | RenderedBarContainer;
  newIndex: number;
  item: DragDayEvent;
};

export const arrayMove = (
  array: (DragDayEvent | BarPlaceholder)[],
  oldIndex: number,
  newIndex: number,
) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
