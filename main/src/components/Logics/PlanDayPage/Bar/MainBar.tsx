import {
  useTime,
} from "@/Logics/Hooks/TimeProvider.tsx";
import BarEvents from "@/Logics/PlanDayPage/Bar/BarEvents.tsx";
import { barHeight } from "!/data/globalData.ts";
import RemainingTime from "./RemainingTime.tsx";

const MainBar = () => {
  const { wakeTime, sleepTime } = useTime();
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-medium text-white flex justify-between">
        <div>{wakeTime.toString()}</div>
        <RemainingTime />
        <div>{sleepTime.toString()}</div>
      </div>

      <div
        className="bg-background border-dark border-7 rounded-full shadow-[15px_15px_0px_rgba(0,0,0,1)] flex"
        style={
          {height: barHeight + "px"}
        }
      >
        <BarEvents />
      </div>
    </div>
  );
};

export default MainBar;
