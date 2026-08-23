import { useTime } from "@/Logics/Hooks/TimeProvider.tsx";
import Heading from "@/Designs/PlanDayPage/Heading.tsx";
import SpecificTimeInput from "@/Logics/Inputs/SpecificTimeInput.tsx";
import StepsTemplate from "@/Designs/PlanDayPage/Steps/StepsTemplate.tsx";
import { useEffect } from "react";
import {
  calculatePixelPer15Minutes,
  useEventWidth,
} from "@/Logics/Hooks/EventWidthProvider.tsx";
import { InsertionType, useDrag } from "../../../Logics/Hooks/DragProvider.tsx";

type Props = {
  onNext?: () => void;
};

const WakeUpSleepStep = ({ onNext }: Props) => {
  const { setSleepTime, setWakeTime, sleepTime, wakeTime } = useTime();
  const { setInserted } = useDrag();
  const { barWidth, setPixelPer15Minutes } = useEventWidth();
  useEffect(() => {
    if (barWidth != 0) {
      setPixelPer15Minutes(
        calculatePixelPer15Minutes(wakeTime, sleepTime, barWidth),
      );
      setInserted(InsertionType.initialize);
      
    }
  }, [wakeTime, sleepTime, barWidth]);

  return (
    <StepsTemplate number={1}>
      <Heading
        title="Wake Up / Sleep Time"
        description="Record the times you plan to wake up or sleep on this day"
      />

      <div className="w-full flex justify-between  md:min-w-180 w-full gap-20 md:flex-row flex-col">
        <SpecificTimeInput
          onChange={(time) => setWakeTime(time)}
          value={wakeTime}
          text="Wake Up"
          color="bg-primary"
        />
        <SpecificTimeInput
          onChange={(time) => setSleepTime(time)}
          value={sleepTime}
          text="Sleep"
          color="bg-secondary"
        />
      </div>

      <button
        type="button"
        onClick={onNext}
        className="self-end bg-primary py-3 px-5 w-fit rounded-xl text-medium hover:cursor-pointer"
      >
        Next Step
      </button>
    </StepsTemplate>
  );
};

export default WakeUpSleepStep;
