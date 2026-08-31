import { screen, fireEvent, render } from "@testing-library/react";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";
import RemainingTime from "@/Logics/PlanDayPage/Bar/RemainingTime.tsx";
import WriteEventsStep from "@/Designs/PlanDayPage/Steps/WriteEventsStep.tsx";
import { DayEvent } from "!/domain/model/DayEvent.ts";

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
