import "./setup-dom.ts"
import { render } from "@testing-library/react"; 
import { expect } from "@std/expect";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";
import RemainingTime from "@/Logics/PlanDayPage/Bar/RemainingTime.tsx";
import CustomEvent from "@/Logics/PlanDayPage/CustomEvent.tsx";
import { createEvent } from "./testHelper.tsx";

Deno.test("renders 16 placeholders by default", () => {
  //Arrange & Act
  const { container } = render(
    <AppProvider >
      <RemainingTime />
      <BarEvents />
    </AppProvider>
  );

  const placeholders = container.querySelectorAll('[id*="placeholder"]');
  //Assert
  expect(placeholders.length).toBe(16);
});


Deno.test("adds an event to the bar, removes excess placeholders", () => {
  const eventId = "1";
  const duration = new Date();
  duration.setHours(1);
  const sampleEvent = createEvent(eventId, "new event", "sample event used for testing", "bg-green-500", duration); 
  //Arrange
    const { container } = render(
    <AppProvider >
      <RemainingTime />
      <BarEvents />
      <CustomEvent customEvent={sampleEvent} />
    </AppProvider>
  );

  placeEventInContainer("activeBarList", 0, eventId);

  const barContainer = container.querySelector('[id="bar-container"]');

  if(!barContainer){
    throw new Error("BarContainer not found!");
  }

  const barEvent = barContainer.querySelector('[id="1"]');
  const placeholders = barContainer.querySelectorAll('[id*="placeholder"]');

  expect(barEvent).not.toBeNull();
  expect(placeholders).toBe(16 - duration.getHours() * 4);


});