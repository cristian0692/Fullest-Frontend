import "./setup-dom.ts";
import { render } from "@testing-library/react";
import { expect } from "@std/expect";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";
import RemainingTime from "@/Logics/PlanDayPage/Bar/RemainingTime.tsx";
import { DragDayEvent } from "!/domain/viewModels/DragDayEvent.ts";
import { RenderedBarContainer } from "!/domain/model/RenderedBarContainer.ts";
import { DayEventContainer } from "!/domain/model/DayEventContainer.ts";
import { getTimeMinutes } from "@/Logics/Hooks/TimeProvider.tsx";
import { moveBetweenContainers } from "!/utils/array.ts";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";

Deno.test("renders 16 placeholders by default", () => {
  //Arrange & Act
  const { container } = render(
    <AppProvider>
      <RemainingTime />
      <BarEvents />
    </AppProvider>,
  );

  const placeholders = container.querySelectorAll('[id*="placeholder"]');
  //Assert
  expect(placeholders.length).toBe(16);
});

Deno.test("adds an event to the bar, removes excess placeholders", () => {
  //Arrange
  const eventId = "1";
  const duration = new Date();
  duration.setHours(1);
  const sampleEvent = new DragDayEvent(
    eventId,
    "new event",
    "bg-green-500",
    getTimeMinutes(duration),
  );

  const renderedContainer: DayEventContainer<DragDayEvent> = new RenderedContainer();
  const renderedBarContainer: RenderedBarContainer = new RenderedBarContainer();

  
  const eventContainers: Record<string, DayEventContainer<DayEvent>> = {
    [EVENT_CONTAINER_NAMES.localEvents]: new DayEventContainer([sampleEvent]),
    [EVENT_CONTAINER_NAMES.barEvents]: new DayEventContainer(),
  };

  renderedContainer.insertItem(sampleEvent);

  moveBetweenContainers({eventContainers , renderedContainer});
});
