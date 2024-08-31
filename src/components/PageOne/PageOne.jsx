import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Pagetext from "./Pagetext";

const PageOne = () => {
  const elemRefs = useRef([]);
  const hoverRef = useRef();


  const mouseEnter = () => {
    console.log("mouse Entered")
  }

  const mouseLeave = () => {
    console.log("mouse leave")
  }

  const mouseMoving = (e) => {
    const xvalue = elemRefs.current.getBoundingClientRect()
    console.log(xvalue)
  }


  return (
    <div className="w-screen mt-[3vw] min-h-screen bg-black pt-[9vw] pb-[2vw] text-white pl-[2vw] pr-[10vw] font-['General Sans']">
      <Pagetext/>
      </div>
  );
};

export default PageOne;
