import "./setup-dom.ts";
import { expect } from "@std/expect";
import { moveBetweenContainers } from "!/utils/array.ts";
import {
  barContainerName,
  calculateAmountOfPlaceholders,
  createDayEvent,
  createEventContainers,
  unplacedContainerName,
} from "./testHelper.tsx";
import { TimeValue } from "!/domain/model/TimeValue.ts";
import { RenderedBarContainer } from "!/domain/model/RenderedBarContainer.ts";
Deno.test("fills 16 placeholders in bar for 4 remaining hours", () => {
  //Arrange
  const startTime = new TimeValue(0, 0);
  const endTime = new TimeValue(4, 0);
  const bar = new RenderedBarContainer("Bar Events", startTime, endTime);
  //Assert
  expect(bar.getDragables().length).toBe(16);
});

Deno.test("moves an event to the bar, removes excess placeholders", () => {
  //Arrange
  const eventId = "1";
  const sampleEvent = createDayEvent(eventId);
  const eventContainers = createEventContainers(2, 6);

  const barContainer =
    eventContainers[barContainerName] as RenderedBarContainer;
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
  const eventId = "1";

  const sampleEvent = createDayEvent(eventId);

  const eventContainers = createEventContainers(0, 2);
  const barContainer =
    eventContainers[barContainerName] as RenderedBarContainer;

  barContainer.insertEvent(sampleEvent, 3);
  const amountOfPlaceholders = calculateAmountOfPlaceholders(
    (barContainer as RenderedBarContainer).getTotalMinutes(),
  );

  const eventIndex = barContainer.findEventIdInDragables(eventId);

  //Act
  moveBetweenContainers({
    oldContainer: barContainer,
    oldIndex: eventIndex,
    newContainer: eventContainers[unplacedContainerName],
    newIndex: 0,
    item: sampleEvent,
  });

  //Assert
  expect(barContainer.getEvents().length).toBe(0);
  expect(barContainer.getDragables().length).toBe(
    amountOfPlaceholders,
  );

  expect(eventContainers[unplacedContainerName].getDragables().length).toBe(1);

  expect(eventContainers[unplacedContainerName].getEvents()[0].getId()).toBe(
    sampleEvent.getId(),
  );
});

Deno.test("moves event in the same bar to different index", () => {
  const barContainer = createEventContainers(
    0,
    2,
  )[barContainerName] as RenderedBarContainer;

  const eventId = "1";
  const sampleEvent = createDayEvent(eventId);

  barContainer.insertEvent(sampleEvent, 0);

  barContainer.moveEvent(0, 3);

  expect(barContainer.getDragables()[3].getId()).toBe(
    sampleEvent.getId(),
  );

  const eventIndex = barContainer.toEventIndex(3);
  expect(barContainer.getEvents()[eventIndex].getId()).toBe(
    sampleEvent.getId(),
  );
});

Deno.test("Event when inserted is given the appropriate start time", () => {
  //Arrange
  const sampleEvent = createDayEvent("1");
  const barContainer = createEventContainers(
    4,
    6,
  )[barContainerName] as RenderedBarContainer;
  //Act
  barContainer.insertEvent(sampleEvent, 4);

  //Assert
  expect(barContainer.getEvents()[0].getStartTime()?.getHour()).toBe(5);
});

Deno.test("Event when inserted with provided time is inserted at the correct index", () => {
  //Arrange
  const sampleEvent = createDayEvent("1");
  const barContainer = createEventContainers(
    5,
    8,
  )[barContainerName] as RenderedBarContainer;
  //Act
  barContainer.insertEventAtTime(sampleEvent, new TimeValue(15, 7));

  //Assert
  expect(barContainer.getEvents()[0].getStartTime()?.getHour()).toBe(7);
  expect(barContainer.getEvents()[0].getStartTime()?.getMinutes()).toBe(15);
});

Deno.test("Event when inserted with invalid provided time returns error", () => {
  //Arrange
  const sampleEvent = createDayEvent("1");
  const barContainer = createEventContainers(
    5,
    8,
  )[barContainerName] as RenderedBarContainer;

  //Act && Assert
  expect(() => barContainer.insertEventAtTime(sampleEvent, new TimeValue(0, 4)))
    .toThrow("Time must be within the startTime and endTime");

  expect(() =>
    barContainer.insertEventAtTime(sampleEvent, new TimeValue(12, 7))
  )
    .toThrow("Time must be divisible by 15");
});
