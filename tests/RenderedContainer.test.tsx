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
  const startTime = new TimeValue(0,0);
  const endTime = new TimeValue(4,0);
  const bar = new RenderedBarContainer("Bar Events", startTime, endTime);
  //Assert
  expect(bar.getDragables().length).toBe(16);
});

Deno.test("moves an event to the bar, removes excess placeholders", () => {
  //Arrange
  const endTime = new TimeValue(0,2);
  const startTime = new TimeValue(0, 6);
  const eventId = "1";

  const sampleEvent = createDayEvent(eventId);
  const eventContainers = createEventContainers(
    unplacedContainerName,
    barContainerName,
    startTime,
    endTime
  );

  const barContainer = eventContainers[barContainerName] as RenderedBarContainer;
  eventContainers[unplacedContainerName].insertEvent(sampleEvent, 0);

  const amountOfPlaceholders = calculateAmountOfPlaceholders(
    barContainer.getTotalMinutes() - sampleEvent.getDurationInMinutes(),
  );
  const amountOfEvents = 1;
  //Act
  moveBetweenContainers({
    oldContainer: eventContainers[unplacedContainerName],
    oldIndex: 0,
    newContainer: barContainer,
    newIndex: 3,
    item: sampleEvent,
  });

  //Assert
  expect(barContainer.getEvents().length).toBe(1);
  expect(barContainer.getDragables().length).toBe(
    amountOfPlaceholders + amountOfEvents,
  );

  expect(eventContainers[unplacedContainerName].getDragables().length).toBe(0);

  expect(barContainer.getEvents()[0].getId()).toBe(
    sampleEvent.getId(),
  );
});

Deno.test("moves event out of the bar, adds missing placeholders", () => {
  //Arrange
  const startTime = new TimeValue(0);
  const endTime = new TimeValue(120);
  const eventId = "1";

  const sampleEvent = createDayEvent(eventId);

  const eventContainers = createEventContainers(
    unplacedContainerName,
    barContainerName,
    startTime,
    endTime
  );

  eventContainers[barContainerName].insertEvent(sampleEvent, 3);
  const amountOfPlaceholders = calculateAmountOfPlaceholders(
    (eventContainers[barContainerName] as RenderedBarContainer).getTotalMinutes(),
  );

  const eventIndex =
    eventContainers[barContainerName].findEventIdInDragables(eventId);

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
  expect(eventContainers[barContainerName].getDragables().length).toBe(
    amountOfPlaceholders,
  );

  expect(eventContainers[unplacedContainerName].getDragables().length).toBe(1);

  expect(eventContainers[unplacedContainerName].getEvents()[0].getId()).toBe(
    sampleEvent.getId(),
  );
});

Deno.test("moves event in the same bar to different index", () => {
  const startTime = new TimeValue(0,0);
  const endTime = new TimeValue(2,0);
  const eventContainers = createEventContainers(
    unplacedContainerName,
    barContainerName,
    startTime, 
    endTime
  );

  const eventId = "1";
  const sampleEvent = createDayEvent(eventId);

  eventContainers[barContainerName].insertEvent(sampleEvent, 0);

  eventContainers[barContainerName].moveEvent(0, 3);

  expect(eventContainers[barContainerName].getDragables()[3].getId()).toBe(
    sampleEvent.getId(),
  );


  
  const eventIndex = eventContainers[barContainerName].toEventIndex(3);
  expect(eventContainers[barContainerName].getEvents()[eventIndex].getId()).toBe(
    sampleEvent.getId(),
  );
});
