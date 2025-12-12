import React from "react";
import { useMouse } from "../../context/MouseContext";
import AnimatedText from "../Animations/AnimatedText";

const PageHover = ({ h1, translate, setImageScroll }) => {
  const { enlargeDot, shrinkDot } = useMouse();

  const onEnter = () => {
    setImageScroll(translate);
    enlargeDot("View More");
  };

  const onLeave = () => {
    shrinkDot();
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="
        border-t border-gray-700 py-6
        text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
        uppercase font-semibold text-stone-300
        hover:text-[#FFEE91] hover:opacity-85 duration-300 ease-in-out 
      "
    >
      <AnimatedText>{h1}</AnimatedText>
    </div>
  );
};

export default PageHover;
