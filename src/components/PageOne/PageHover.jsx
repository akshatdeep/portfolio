import React from "react";
import { useMouse } from "../../App"; // Adjust path accordingly

const PageHover = (props) => {
  const { enlargeDot, shrinkDot } = useMouse();

  const handleMouseEnter = () => {
    // Trigger image scroll animation
    if (props.setImageScroll) {
      props.setImageScroll(props.translate);
    }
    // Trigger mouse dot enlarge with "View More"
    enlargeDot("View More");
  };

  const handleMouseLeave = () => {
    shrinkDot();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative border-t-2 border-gray-600 py-[4vw] uppercase text-3xl lg:text-7xl font-semibold cursor-pointer"
    >
      <div className="overflow z-20 w-full h-full absolute left-0 top-0"></div>
      <h1 className="text-stone-400">{props.h1}</h1>
    </div>
  );
};

export default PageHover;
