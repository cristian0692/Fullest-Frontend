import "./setup-dom.ts";
import { render } from "@testing-library/react";
import { expect } from "@std/expect";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";
import RemainingTime from "@/Logics/PlanDayPage/Bar/RemainingTime.tsx";
import { RenderedContainer } from "!/domain/model/RenderedContainer.ts";
import { moveBetweenContainers } from "!/utils/array.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { RenderType } from "!/domain/model/enums/RenderType.ts";
import { calculateAmountOfPlaceholders } from "./testHelper.tsx";
import { TimeValue } from "!/domain/model/TimeValue.ts";

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
  const totalTimeAmountInMinutes = 240;
  const eventId = "1";
  const duration = new TimeValue(60);

  const sampleEvent = new DayEvent(
    eventId,
    "new event",
    "This is a description",
    "bg-green-500",
    duration,
  );
  const unplacedContainerName = "Unplaced Events";
  const barContainerName = "Bar Events";
  const eventContainers: Record<string, RenderedContainer> = {
    [unplacedContainerName]: new RenderedContainer(
      unplacedContainerName,
      RenderType.Default,
      [sampleEvent],
    ),
    [barContainerName]: new RenderedContainer("Bar Events", RenderType.Bar),
  };
  const amountOfPlaceholders = calculateAmountOfPlaceholders(
    totalTimeAmountInMinutes - sampleEvent.getDurationInMinutes(),
  );
  const amountOfEvents = 1;

  eventContainers[barContainerName].fillEmptyBarWithPlaceholders(
    totalTimeAmountInMinutes,
  );
  //Act
  moveBetweenContainers({
    oldContainer: eventContainers[unplacedContainerName],
    oldIndex: 0,
    newContainer: eventContainers[barContainerName],
    newIndex: 3,
    item: sampleEvent,
  });

  //Assert
  expect(eventContainers[barContainerName].getEvents().length).toBe(1);
  expect(eventContainers[barContainerName].getItems().length).toBe(
    amountOfPlaceholders + amountOfEvents,
  );

  expect(eventContainers[unplacedContainerName].getItems().length).toBe(0);

  expect(eventContainers[barContainerName].getEvents()[0].getId()).toBe(
    sampleEvent.getId(),
  );
});

Deno.test("moves event out of the bar, adds missing placeholders", () => {
  //Arrange
  const totalTimeInMinutes = 120;
  const eventId = "1";
  const duration = new TimeValue(60);

  const sampleEvent = new DayEvent(
    eventId,
    "new event",
    "This is a description",
    "bg-green-500",
    duration,
  );

  const unplacedContainerName = "Unplaced Events";
  const barContainerName = "Bar Events";
  const eventContainers: Record<string, RenderedContainer> = {
    [unplacedContainerName]: new RenderedContainer(
      unplacedContainerName,
      RenderType.Default,
      [sampleEvent],
    ),
    [barContainerName]: new RenderedContainer("Bar Events", RenderType.Bar),
  };

  eventContainers[barContainerName].fillEmptyBarWithPlaceholders(totalTimeInMinutes);
  eventContainers[barContainerName].insertEvent(sampleEvent, 3);
  //Act
  moveBetweenContainers({
    oldContainer: eventContainers[barContainerName],
    oldIndex: 0,
    newContainer: eventContainers[unplacedContainerName],
    newIndex: 3,
    item: sampleEvent,
  });


  



});
