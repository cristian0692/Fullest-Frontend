import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import "./setup-dom.ts";
import RemainingTime from "@/Logics/PlanDayPage/Bar/RemainingTime.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";
import { expect } from "@std/expect/expect";
import { render } from "@testing-library/react";



Deno.test("Bar loads with 16 placeholders ", () => {
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
