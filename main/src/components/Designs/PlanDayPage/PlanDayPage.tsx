import { useEffect, useRef, useState } from "react";
import MainBar from "@/Logics/PlanDayPage/Bar/MainBar.tsx";
import WakeUpSleepStep from "@/Designs/PlanDayPage/Steps/WakeUpSleepStep.tsx";
import WriteEventsStep from "@/Designs/PlanDayPage/Steps/WriteEventsStep.tsx";
import PlaceEventsStep from "@/Designs/PlanDayPage/Steps/PlaceEventsStep.tsx";
import { animate } from "animejs";
import { disableScroll, enableScroll } from "@/Logics/scrollManager.ts";
import { useEventWidth } from "@/Logics/Hooks/EventWidthProvider.tsx";
import { useEvent } from "@/Logics/Hooks/EventProvider.tsx";
import { EVENT_CONTAINER_NAMES } from "!/data/globalData.ts";
import { saveDay } from "../../../api/router.ts";
import { useTime } from "../../Logics/Hooks/TimeProvider.tsx";
import { DayEvent } from "!/domain/model/DayEvent.ts";

const PlanDayPage = () => {
  const [step, setStep] = useState(1);
  const { setBarWidth } = useEventWidth();
  const { wakeTime, sleepTime } = useTime();
  const { eventContainers, dayEvents } = useEvent();
  const [redirecting, setRedirecting] = useState(true);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const duration = 1500;
  const barRef = useRef<HTMLDivElement>(null);
  const initializePage = () => {
    globalThis.scroll(0, 0);

    disableScroll();
    if (barRef.current) {
      setBarWidth(barRef.current.clientWidth);
    }

    const timer = setTimeout(() => {
      enableScroll();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  };

  const animateBubbleShrink = () => {
    if (!redirecting || !bubbleRef.current) return;

    const initialWidth = globalThis.innerWidth > globalThis.innerHeight
      ? "150vw"
      : "170vh";
    const initialHeight = globalThis.innerWidth > globalThis.innerHeight
      ? "150vw"
      : "170vh";

    bubbleRef.current.style.width = initialWidth;
    bubbleRef.current.style.height = initialHeight;
    bubbleRef.current.style.top = "-50%";

    animate(bubbleRef.current, {
      width: 0,
      height: 0,
      top: "50%",
      ease: "inBounce",
      duration: duration,
      onComplete: () => {
        if (bubbleRef.current) {
          bubbleRef.current.style.display = "none";
        }
        setRedirecting(false);
      },
    });
  };

  const handleComplete = () => {
    const name = EVENT_CONTAINER_NAMES.barEvents;

    const dragEvents = eventContainers[name];

    const events: (DayEvent | undefined)[] = dragEvents.getItems().map((dragEvent) => (
      dayEvents.find((event) => event.getId() == dragEvent.getId())
    ));
    if (!events) {
      return;
    }

    saveDay(events, wakeTime, sleepTime);
  };

  useEffect(() => {
    initializePage();
  }, []);
  useEffect(() => {
    animateBubbleShrink();
  }, [redirecting]);
  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 flex flex-col gap-20 items-center">
        {/*------------------- Main Bar ----------------------*/}
        <div ref={barRef} className="max-w-300 w-full">
          <MainBar />
        </div>
        {/* ------------- Menus ----------------- */}
        <div className="max-w-250">
          {step == 1 && <WakeUpSleepStep onNext={() => setStep(2)} />}
          {step == 2 && (
            <WriteEventsStep
              onPrevious={() => setStep(1)}
              onNext={() => {
                setStep(3);
              }}
            />
          )}
          {step == 3 && (
            <PlaceEventsStep
              onPrevious={() => setStep(2)}
              onComplete={() => handleComplete()}
            />
          )}
        </div>
        {/* ---------- Buble --------------------------- */}
        <div
          ref={bubbleRef}
          className="absolute rounded-full bg-primary"
        >
        </div>
      </div>
    </div>
  );
};

export default PlanDayPage;
