import React from "react";

const PageHover = (props) => {
  // console.log(props.setImageScroll)
  const mouseEntered = () => {
    props.setImageScroll(props.translate);
  };
  return (
    <div
      onMouseEnter={mouseEntered}
      className=" relative border-t-2 border-gray-600 py-[4vw] uppercase text-3xl lg:text-7xl font-semibold"
    >
      <div className="overflow z-20 w-full h-full absolute left-0 top-0 "></div>
      <h1 className="text-stone-400">{props.h1} </h1>
    </div>
  );
};

export default PageHover;
