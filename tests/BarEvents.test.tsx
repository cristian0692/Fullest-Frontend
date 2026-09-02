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

Deno.test("moves an event to the bar, removes excess placeholders", () => {
  //Arrange
  const eventId = "1";
  const duration = new Date();
  duration.setHours(1);
  duration.setMinutes(0);
  const sampleEvent = new DayEvent(
    eventId,
    "new event",
    "This is a description",
    "bg-green-500",
    duration,
  );

  const renderedContainer: DayEventContainer<DragDayEvent> =
    new DayEventContainer(EVENT_CONTAINER_NAMES.localEvents, [
      sampleEvent.toDragDayEvent(),
    ]);
  const renderedBarContainer: RenderedBarContainer = new RenderedBarContainer(
    EVENT_CONTAINER_NAMES.barEvents,
  );

  renderedBarContainer.fillEmptyBarWithPlaceholders(120); // 8 placeholders

  const eventContainers: Record<string, DayEventContainer<DayEvent>> = {
    [renderedContainer.getName()]: new DayEventContainer("Unplaced Events", [
      sampleEvent,
    ]),
    [renderedBarContainer.getName()]: new DayEventContainer("Bar Events"),
  };
  //Act
  moveBetweenContainers({
    eventContainers,
    oldContainer: renderedContainer,
    oldIndex: 0,
    newContainer: renderedBarContainer,
    newIndex: 3,
    item: sampleEvent.toDragDayEvent(),
  });

  //Assert
  expect(
    eventContainers[renderedBarContainer.getName()].getItems().length,
  ).toBe(1);
  expect(renderedBarContainer.getItems().length).toBe(5);
  expect(renderedContainer.getItems().length).toBe(0);
  expect(eventContainers[renderedContainer.getName()].getItems().length).toBe(
    0,
  );
  expect(
    eventContainers[renderedBarContainer.getName()].getItems()[0].getId(),
  ).toBe(eventId);
});

Deno.test("moves event out of the bar, adds missing placeholders", () => {
  //Arrange
  const eventId = "1";
  const duration = new Date();
  duration.setHours(1);
  duration.setMinutes(0);
  const sampleEvent = new DayEvent(
    eventId,
    "new event",
    "This is a description",
    "bg-green-500",
    duration,
  );

  const renderedContainer: DayEventContainer<DragDayEvent> =
    new DayEventContainer(EVENT_CONTAINER_NAMES.localEvents);
  const renderedBarContainer: RenderedBarContainer = new RenderedBarContainer(
    EVENT_CONTAINER_NAMES.barEvents
  );

  renderedBarContainer.fillEmptyBarWithPlaceholders(120); // 8 placeholders
  renderedBarContainer.insertItem(sampleEvent.toDragDayEvent(), 3); // add event to the bar

  const eventContainers: Record<string, DayEventContainer<DayEvent>> = {
    [renderedContainer.getName()]: new DayEventContainer("Unplaced Events"),
    [renderedBarContainer.getName()]: new DayEventContainer("Bar Events", [
      sampleEvent,
    ]),
  };
  //Act
  moveBetweenContainers({
    eventContainers,
    oldContainer: renderedBarContainer,
    oldIndex: 0,
    newContainer: renderedContainer,
    newIndex: 3,
    item: sampleEvent.toDragDayEvent(),
  });
});
