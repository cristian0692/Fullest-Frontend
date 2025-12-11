import { useEffect, useRef } from "react";

import { createTimeline } from "animejs";
import ExplosionParticles from "@/Designs/ExplosionParticles.tsx";

type Props = {
  onBarComplete?: () => void;
};

const LoadingBar = ({ onBarComplete }: Props) => {
  const loadingFillRef = useRef(null);
  const explosionRef1 = useRef(null);
  const explosionRef2 = useRef(null);
  const explosionRef3 = useRef(null);
  const explosionCollectionRef = useRef(null);
  const distance = 130; // pixels to move

  useEffect(() => {
    if (
      !loadingFillRef.current ||
      !explosionRef1.current ||
      !explosionRef2.current ||
      !explosionRef3.current ||
      !explosionCollectionRef.current
    )
      return;

    const tl = createTimeline({ defaults: { duration: 750 } });

    tl.add(loadingFillRef.current, {
      width: ["20%", "45%", "60%", "100%"],
      duration: 4000,
      ease: "inOutExpo",
    });
    tl.add(
      explosionCollectionRef.current,
      {
        opacity: [0, 1],
        duration: 1,
      },
      "<-=200"
    );
    tl.add(
      [explosionRef1.current, explosionRef2.current, explosionRef3.current],
      {
        x: distance,
        duration: 500,
        easing: "easeOutExpo",
        onBegin: () => {
          if (onBarComplete) onBarComplete();
        }, // the animation looks when complete triggers on explosion begin
      },
      "<-=200"
    );
  }, []);

  return (
    <div className="w-full flex items-center">
      <div className="w-full relative">
        <div
          ref={explosionCollectionRef}
          className="absolute top-[50%] right-0 z-1"
          style={{ opacity: 0 }}
        >
          <ExplosionParticles
            particle1={explosionRef1}
            particle2={explosionRef2}
            particle3={explosionRef3}
          />
        </div>
        <div className="bg-background border-dark border-7 rounded-full sm:h-20 h-15 z-10 sm:shadow-[15px_15px_0px_rgba(0,0,0,1)] shadow-[8px_8px_0px_rgba(0,0,0,1)] ">
          <div
            ref={loadingFillRef}
            className="h-full bg-primary rounded-full w-18"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
