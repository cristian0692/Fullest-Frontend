import "./setup-dom.ts";
import { render } from "@testing-library/react";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import WriteEventsStep from "@/Designs/PlanDayPage/Steps/WriteEventsStep.tsx";
import { DayEvent } from "!/domain/model/DayEvent.ts";
import { screen, fireEvent } from "@testing-library/react";
import { expect } from "@std/expect";

Deno.test(
  "Creating an event should add it to the default eventContainers",
  () => {
    //Arrange
    render(
      <AppProvider>
        <WriteEventsStep onPrevious={() => {}} onNext={() => {}} />
      </AppProvider>,
    );

    const eventId = "1";
    const duration = new Date();
    duration.setHours(1);
    const sampleEvent = new DayEvent(
      eventId,
      "new event",
      "sample event used for testing",
      "bg-green-500",
      duration,
    );

    //Act
    const titleInput = screen.getByLabelText(/event name/i);
    fireEvent.change(titleInput, { target: { value: sampleEvent.getTitle() } });

    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { value: sampleEvent.getDescription() },
    });

    const addButton = screen.getByRole("button", { name: /add event/i });
    fireEvent.click(addButton);

    const toggleButton = screen.getByRole("button", {
      name: /see all events/i,
    });
    fireEvent.click(toggleButton);

    //Assert

    const eventTitle = screen.getByText(sampleEvent.getTitle());
    expect(eventTitle.textContent).toBeDefined;

    const eventDescription = screen.getByText(sampleEvent.getTitle());
    expect(eventDescription).toBeDefined();
  },
);
