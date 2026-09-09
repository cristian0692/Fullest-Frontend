import "./setup-dom.ts";
import { expect } from "@std/expect";
import { RenderedContainer } from "!/domain/model/RenderedContainer.ts";
import { moveBetweenContainers } from "!/utils/array.ts";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { RenderType } from "!/domain/model/enums/RenderType.ts";
import { calculateAmountOfPlaceholders } from "./testHelper.tsx";
import { TimeValue } from "!/domain/model/TimeValue.ts";

Deno.test("fills 16 placeholders in bar for 4 remaining hours", () => {
  //Arrange 
  const bar = new RenderedContainer("Bar Events", RenderType.Bar)
  //Act
  bar.fillEmptyBarWithPlaceholders(240);
  
  //Assert
  expect(bar.getItems().length).toBe(16);
});

Deno.test("moves an event to the bar, removes excess placeholders", () => {
  //Arrange
  const totalTimeInMinutes = 240;
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
    totalTimeInMinutes - sampleEvent.getDurationInMinutes(),
  );
  const amountOfEvents = 1;

  eventContainers[barContainerName].fillEmptyBarWithPlaceholders(
    totalTimeInMinutes,
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
      unplacedContainerName
    ),
    [barContainerName]: new RenderedContainer("Bar Events", RenderType.Bar),
  };

  eventContainers[barContainerName].fillEmptyBarWithPlaceholders(
    totalTimeInMinutes,
  );
  eventContainers[barContainerName].insertEvent(sampleEvent, 3);
  const amountOfPlaceholders = calculateAmountOfPlaceholders(totalTimeInMinutes);
  
  const eventIndex = eventContainers[barContainerName].findEventInItems(eventId);
  //Act
  moveBetweenContainers({
    oldContainer: eventContainers[barContainerName],
    oldIndex: eventIndex,
    newContainer: eventContainers[unplacedContainerName],
    newIndex: 0,
    item: sampleEvent,
  });

  //Assert
  expect(eventContainers[barContainerName].getEvents().length).toBe(0);
  expect(eventContainers[barContainerName].getItems().length).toBe(amountOfPlaceholders);

  expect(eventContainers[unplacedContainerName].getItems().length).toBe(1);

  expect(eventContainers[unplacedContainerName].getEvents()[0].getId()).toBe(
    sampleEvent.getId(),
  );
});
