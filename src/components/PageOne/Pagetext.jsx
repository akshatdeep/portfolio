import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const Pagetext = () => {

    const hoverRef = useRef(null)
    const parentRef = useRef(null)

    const mouseEnter = ()=>{
      hoverRef.current.style.transform = "translate(-50%, -50%) scale(1)"
    }

    const mouseLeave = ()=>{
        hoverRef.current.style.transform = "translate(-50%, -50%) scale(0)"
    }

    const mouseMove = (e)=>{
      const xvalue = e.clientX -  parentRef.current.getBoundingClientRect().x
      const yvalue = e.clientY - parentRef.current.getBoundingClientRect().y

      hoverRef.current.style.left = xvalue + "px"
      hoverRef.current.style.top = yvalue + "px"
    }


  return (
    <div ref={parentRef} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onMouseMove={(e)=>{mouseMove(e)}} className='font-["General Sans"] relative'>
        <div ref={hoverRef} className=" overflow-hidden imgdiv h-[20vw] z-10 w-[20vw] bg-red-500 absolute -translate-x-1/2 -translate-y-1/2 scale-0">
            <div className="h-full w-full bg-slate-700">
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1721448287885-d37bdc7c0104?q=80&w=1447&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1721448288287-6dc6ce150e40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1637747018746-bece2b8a0309?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1637747022694-92c8cbc90a38?q=80&w=1417&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
        </div>
      <div>
        <div className=" relative border-t-2 border-gray-600 py-[4vw] uppercase text-7xl font-semibold">
            <div className="overflow z-20 w-full h-full absolute left-0 top-0 "></div>
          <h1 className="text-stone-400">RealEstate website</h1>
        </div>
        <div className=" relative  border-t-2 border-gray-600 py-[4vw] uppercase text-7xl font-semibold">
        <div className="overflow z-20 w-full h-full absolute left-0 top-0 "></div>
          <h1 className="text-stone-400">Real Time chatapp</h1>
        </div>
        <div className=" relative border-t-2 border-gray-600 py-[4vw] uppercase text-7xl font-semibold">
        <div className="overflow z-20 w-full h-full absolute left-0 top-0 "></div>
          <h1 className="text-stone-400">bloggin platform</h1>
        </div>
        <div className=" relative border-t-2 border-gray-600 py-[4vw] uppercase text-7xl font-semibold border-b-2">
        <div className="overflow z-20 w-full h-full absolute left-0 top-0 "></div>
          <h1 className="text-stone-400">animated website</h1>
        </div>
      </div>
    </div>
  );
};

export default Pagetext;
