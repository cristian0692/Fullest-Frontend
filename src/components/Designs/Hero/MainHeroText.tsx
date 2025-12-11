import { createTimeline, Timeline } from "animejs";
import { useEffect, useRef } from "react";

type Props = {
  startAnimation: boolean;
};

const MainHeroText = ({ startAnimation }: Props) => {
  const containerRef = useRef(null);
  let tl: Timeline;

  useEffect(() => {
    if (!containerRef.current) return;

    tl = createTimeline({ autoplay: false });
    tl.add(containerRef.current, {
      width: "0",
      duration: 4,
    });
    tl.add(containerRef.current, {
      width: "100%",
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    {
      if (tl != null) startAnimation && tl.play();
    }
  }, [startAnimation]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:items-start items-center lg:max-w-[350px] md:max-w-[300px] sm:max-w-[200px]"
    >
      <div className="-mt-8  flex flex-col lg:text-6xl  text-5xl text-primary gap-3">
        <div className="flex gap-3">
          Fill
          <span
            className="text-transparent text-nowrap"
            style={{ WebkitTextStroke: "1px #f58b1a" }}
          >
            your day
          </span>
        </div>
        <div className="flex gap-3">
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px #f58b1a" }}
          >
            with
          </span>
          <span className="italic">Fullest</span>
        </div>
      </div>
      <div className="sm:pt-12 pt-6 flex justify-end md:w-[115%] sm:-mr-35 text-white lg:text-medium text-[20px] text-nowrap">
        plan your day with purpose
      </div>
    </div>
  );
};

export default MainHeroText;
