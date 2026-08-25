import "./setup-dom.ts"
import { render } from "@testing-library/react";
import { expect } from "@std/expect";
import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";
import RemainingTime from "@/Logics/PlanDayPage/Bar/RemainingTime.tsx";

Deno.test("renders 16 placeholders by default", () => {
  const { container } = render(
    <AppProvider >
      <RemainingTime />
      <BarEvents />
    </AppProvider>
  );

  const placeholders = container.querySelectorAll('[id*="placeholder"]');

  expect(placeholders.length).toBe(16);
});