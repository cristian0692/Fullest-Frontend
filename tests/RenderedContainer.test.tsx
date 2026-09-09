import "./setup-dom.ts";
import { expect } from "@std/expect";
import { moveBetweenContainers } from "!/utils/array.ts";
import {
  calculateAmountOfPlaceholders,
  createDayEvent,
  createEventContainers,
} from "./testHelper.tsx";
import { TimeValue } from "!/domain/model/TimeValue.ts";
import { RenderedBarContainer } from "!/domain/model/RenderedBarContainer.ts";
const unplacedContainerName = "Unplaced Events";
const barContainerName = "Bar Events";
Deno.test("fills 16 placeholders in bar for 4 remaining hours", () => {
  //Arrange
  const totalTime = new TimeValue(240);
  const bar = new RenderedBarContainer("Bar Events", totalTime);
  //Assert
  expect(bar.getItems().length).toBe(16);
});

Deno.test("moves an event to the bar, removes excess placeholders", () => {
  //Arrange
  const totalTimeInMinutes = new TimeValue(240);
  const eventId = "1";

  const sampleEvent = createDayEvent(eventId);
  const eventContainers = createEventContainers(unplacedContainerName, barContainerName, totalTimeInMinutes);
  eventContainers[unplacedContainerName].insertEvent(sampleEvent, 0);


  const amountOfPlaceholders = calculateAmountOfPlaceholders(
    totalTimeInMinutes.getTotalMinutes() - sampleEvent.getDurationInMinutes(),
  );
  const amountOfEvents = 1;
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
  const totalTime = new TimeValue(120);
  const eventId = "1";

  const sampleEvent = createDayEvent(eventId);

  const eventContainers = createEventContainers(unplacedContainerName, barContainerName, totalTime);

  eventContainers[barContainerName].insertEvent(sampleEvent, 3);
  const amountOfPlaceholders =
    calculateAmountOfPlaceholders(totalTime.getTotalMinutes());

  const eventIndex =
    eventContainers[barContainerName].findEventInItems(eventId);
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
  expect(eventContainers[barContainerName].getItems().length).toBe(
    amountOfPlaceholders,
  );

  expect(eventContainers[unplacedContainerName].getItems().length).toBe(1);

  expect(eventContainers[unplacedContainerName].getEvents()[0].getId()).toBe(
    sampleEvent.getId(),
  );
});

Deno.test("moves event in the same bar to different index", () => {

  const eventContainers = createEventContainers(unplacedContainerName, barContainerName, new TimeValue(120));

  const eventId = "1";
  const sampleEvent = createDayEvent(eventId);


  eventContainers[barContainerName].fillEmptyBarWithPlaceholders(120);
  
});
