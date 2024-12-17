import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import PageHover from "./PageHover";
import { motion } from "framer-motion";

const Pagetext = () => {
  const hoverRef = useRef(null);
  const parentRef = useRef(null);

  const [ImageScroll, setImageScroll] = useState(0);

  const textArry = [
    "RealEstate website",
    "Real Time chatapp",
    "bloggin platform",
    "animated website",
  ];
  const mouseEnter = () => {
    hoverRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    hoverRef.current.style.transition = ".1s all ";
  };

  const mouseLeave = () => {
    hoverRef.current.style.transform = "translate(-50%, -50%) scale(0)";
  };

  const xValueRef = useRef(0);
  const yValueRef = useRef(0);

  const mouseMove = (e) => {
    const xvalue = e.clientX - parentRef.current.getBoundingClientRect().x;
    const yvalue = e.clientY - parentRef.current.getBoundingClientRect().y;

    xValueRef.current = xvalue;
    yValueRef.current = yvalue;

    gsap.to(hoverRef.current, {
      top: yValueRef.current,
      left: xValueRef.current,
      ease: "slow(0.7,0.7,false)",
    });
  };

  return (
    <div
      ref={parentRef}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onMouseMove={(e) => {
        mouseMove(e);
      }}
      className='font-["General Sans"] relative'
    >
      <div
        ref={hoverRef}
        className=" overflow-hidden imgdiv h-[20vw] z-10 w-[40vw] bg-stone-500 absolute -translate-x-1/2 -translate-y-1/2 scale-0"
      >
        <motion.div
          animate={{
            transform: `translateY(-${ImageScroll}%)`,
          }}
          className="h-full w-full bg-slate-700"
        >
          <img
            className="h-full w-full object-center object-cover"
            src="public/images/Screenshot 2024-11-26 152132.png"
            alt=""
          />
          <img
            className="h-full w-full object-cover"
            src="public/images/pixelcut-export.png"
            alt=""
          />
          <img
            className="h-full w-full object-center object-cover"
            src="public/images/blog.png"
            alt=""
          />
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1637747022694-92c8cbc90a38?q=80&w=1417&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </motion.div>
      </div>
      <div>
        {textArry.map((elem, index) => {
          return (
            <PageHover
              key={index}
              translate={index * 100}
              h1={elem}
              setImageScroll={setImageScroll}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Pagetext;
