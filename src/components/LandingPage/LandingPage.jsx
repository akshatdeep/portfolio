import React, { useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LandingPage = () => {
  const h1Ref = useRef();
  const h1Ref2 = useRef();
  const pRef2 = useRef();
  const pRef3 = useRef();
  const aRef = useRef();
  const aRef2 = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(h1Ref.current, {
      y: 0,
      duration: 0.7,
      ease: "slow(0.7,0.7,false)",
      stagger: 2,
    });

    tl.to(h1Ref2.current, {
      y: 0,
      duration: 0.7,
      ease: "slow(0.7,0.7,false)",
    });

    tl.to(pRef2.current, {
      y: 0,
      duration: 0.5,
      ease: "slow(0.7,0.7,false)",
    });

    tl.to(pRef3.current, {
      y: 0,
      duration: 0.5,
      ease: "slow(0.7,0.7,false)",
    });

    tl.from(aRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "slow(0.7,0.7,false)",
    });
    tl.from(aRef2.current, {
      opacity: 0,
      duration: 0.5,
      ease: "slow(0.7,0.7,false)",
    });
  });

  return (
    <div className="min-h-screen w-screen bg-black text-white overflow-x-hidden relative font-['General Sans'] absolute">
      <NavBar />
      <div className="heading pl-[3vw] pt-[4rem] leading-[9vw]">
        <div className="animetionelem w-fit   overflow-hidden">
          <h1
            ref={h1Ref}
            className="text-[10vw] font-semibold uppercase opacity-60 translate-y-[100%]"
          >
            Mern Stack
          </h1>
        </div>
        <div className="">
          <div className="animetionelem  w-fit overflow-hidden">
            <h1
              ref={h1Ref2}
              className="text-[10vw] font-semibold uppercase opacity-60 pl-[20vw] translate-y-[100%]"
            >
              Developer
            </h1>
          </div>
        </div>
      </div>
      <div className="text-right pt-[3vw] pr-[2vw] font-medium w-full flex flex-col items-end">
        <div className="w-fit overflow-hidden ">
          <p
            ref={pRef2}
            className="leading-loose  uppercase -translate-y-[100%]"
          >
            available for freelance
          </p>
        </div>
        <div className="w-fit  overflow-hidden">
          <p
            ref={pRef3}
            className="leading-loose  uppercase -translate-y-[100%]"
          >
            office opportunities
          </p>
        </div>
      </div>
      <div className="landingFooter w-full flex justify-between px-[2vw] absolute bottom-[3%] uppercase font-semibold">
        <a className="inline-block" ref={aRef} href="">
          download resume <i class="ri-arrow-right-up-line"></i>
        </a>
        <a ref={aRef2} href="">
          View Projects <i class="ri-arrow-right-up-line"></i>
        </a>
        <div className="flex gap-3">
          <div className="px-[6px] py-[2px] rounded-full bg-stone-400 text-black font-semibold">
            <i class="ri-arrow-down-line"></i>
          </div>
          <div className="px-[6px] py-[2px] rounded-full bg-stone-400 text-black font-semibold">
            <i class="ri-arrow-down-line"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
