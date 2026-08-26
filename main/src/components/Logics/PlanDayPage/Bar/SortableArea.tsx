import { useDroppable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import SortableEvent from "../SortableEvent.tsx";
import { BarPlaceholder } from "!/domain/model/BarPlaceHolder.ts";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";

type Props = {
  id: string;
  items: (BarPlaceholder | DragDayEvent)[];
  extraStyling?: string;
  rounded?: boolean;
};

const SortableContainer = (
  { id, items, extraStyling = "", rounded = false }: Props,
) => {
  const { setNodeRef } = useDroppable({ id });
  if (!items) {
    return;
  }

  return (
    <SortableContext
      id={id}
      items={items.map(i => i.getId())}
      strategy={horizontalListSortingStrategy}
    >
      <ul
        className={`flex items-start h-full ${extraStyling}`}
        ref={setNodeRef}
      >
        {items.map((item, i) => {
          return (
            <SortableEvent
              key={item.getId()}
              eventId={item.getId()}
              first={i == 0 && rounded}
              last={i == items.length - 1 && rounded}
            />
          );
        })}
      </ul>
    </SortableContext>
  );
};

export default SortableContainer;
