import { useEffect, useRef, useState } from "react";
import LoadingBar from "./LoadingBar.tsx";
import MainHeroText from "./MainHeroText.tsx";
import { animate } from "animejs";
import MainButton from "../Main/MainButton.tsx";
import SecondaryButton from "../Main/SecondaryButton.tsx";
import { useNavigate } from "react-router-dom";
import { disableScroll } from "@/Logics/scrollManager.ts";

const Hero = () => {
  const [barLoaded, setBarLoaded] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const loadingBarRef = useRef(null);
  const buttonsRef = useRef(null);
  const bubbleRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!buttonsRef.current || !loadingBarRef.current || !barLoaded) return;

    animate(loadingBarRef.current, {
      rotate: "0.015turn",
      duration: 200,
      ease: "inOut",
    });
    animate(buttonsRef.current, {
      opacity: 1,
      duration: 2000,
    });
  }, [barLoaded]);

  useEffect(() => {
    if (!redirecting || !bubbleRef.current) return;
    const availScreenWidth = globalThis.innerWidth;
    const availScreenHeight = globalThis.innerHeight;
    const magnitude = availScreenWidth > availScreenHeight ? "180vw" : "180vh";

    globalThis.scroll(0, 0);
    disableScroll(); //disable scroll to prevent cluncky behavious

    animate(bubbleRef.current, {
      height: magnitude,
      width: magnitude,
      left: "-50%",
      top: "-50%",
      duration: 1500,
      ease: "inBounce",
      onComplete: () => navigate("/new-calendar"),
    });
    globalThis.scroll(0, 0);
  }, [redirecting]);

  const redirectToCreatePage = () => {
    setRedirecting(true);
  };
  return (
    <>
      <div className="w-full pt-10 pb-20 flex sm:flex-row flex-col justify-center gap-20 sm:gap-20 items-center">
        {barLoaded ? (
          <MainHeroText startAnimation={barLoaded} />
        ) : (
          <div className="h-33 w-0"></div>
        )}
        <div
          ref={loadingBarRef}
          className="pb-20 sm:w-auto sm:flex-1 w-[70%] lg:max-w-120 md:max-w-100 sm:max-w-70 max-w-100 flex justify-center"
        >
          <LoadingBar onBarComplete={() => setBarLoaded(true)} />
        </div>
      </div>
      <div
        ref={buttonsRef}
        className="w-full flex justify-center gap-5 sm:pr-50"
        style={{ opacity: 0 }}
      >
        <MainButton onClick={redirectToCreatePage}>Start Now</MainButton>

        {redirecting && (
          <div
            ref={bubbleRef}
            className="rounded-full absolute bg-primary"
            style={{ width: "10px", height: "10px", left: "35%", top: "65%" }}
          ></div>
        )}
        <SecondaryButton>How to Use</SecondaryButton>
      </div>
    </>
  );
};

export default Hero;
