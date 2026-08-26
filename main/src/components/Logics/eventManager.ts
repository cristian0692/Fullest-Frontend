import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";

export const placeEventInContainer = (
  allEventContainers: Record<string, DragDayEvent[]>,
  containerName: string,
  index: number,
  newEvent: DragDayEvent,
) => {

    const container: DragDayEvent[] = allEventContainers[containerName];

    container.splice(index, 0, newEvent);
    
};
