import { AppProvider } from "@/Logics/Hooks/AppProvider.tsx";
import { render } from "@testing-library/react"; 

import "./setup-dom.ts";
import RemainingTime from "@/Logics/PlanDayPage/Bar/RemainingTime.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";

Deno.test(
  "moving an item from renderedContainer to barRenderedContainer \
     should update eventGroups properly",
  () => {
    const { container } = render(
      <AppProvider>
        <RemainingTime />
        <BarEvents />
      </AppProvider>,
    );
  },
);
