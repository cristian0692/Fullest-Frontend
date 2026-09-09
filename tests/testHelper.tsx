import { screen, fireEvent, render } from "@testing-library/react";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";
import RemainingTime from "@/Logics/PlanDayPage/Bar/RemainingTime.tsx";
import WriteEventsStep from "@/Designs/PlanDayPage/Steps/WriteEventsStep.tsx";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { RenderedContainer } from "!/domain/model/RenderedContainer.ts";
import { RenderType } from "!/domain/model/enums/RenderType.ts";
import { TimeValue } from "!/domain/model/TimeValue.ts";
import { RenderedBarContainer } from "!/domain/model/RenderedBarContainer.ts";

export function setUpEvents(events: DayEvent[], extra?: React.ReactNode) {
  const result = render(
    <AppProvider>
      {extra}
      <WriteEventsStep onPrevious={() => {}} onNext={() => {}} />
    </AppProvider>,
  );

  for (const event of events) {
    const titleInput = screen.getByLabelText(/event name/i);
    fireEvent.change(titleInput, { target: { value: event.getTitle() } });

    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { value: event.getDescription() },
    });

    const addButton = screen.getByRole("button", { name: /add event/i });
    fireEvent.click(addButton);
  }
  return result;
}

export function createEventContainers(
  unplacedContainerName: string,
  barContainerName: string,
  totalTime: TimeValue,
): Record<string, RenderedContainer> {
  return {
    [unplacedContainerName]: new RenderedContainer(unplacedContainerName),
    [barContainerName]: new RenderedBarContainer("Bar Events", totalTime),
  };
}

export function createDayEvent(id: string, minutes: number = 60): DayEvent {
  const duration = new TimeValue(minutes);

  return new DayEvent(
    id,
    "new event",
    "This is a description",
    "bg-green-500",
    duration,
  );
}

export function calculateAmountOfPlaceholders(remainingTimeInMinutes: number) {
  return remainingTimeInMinutes / 15;
}
