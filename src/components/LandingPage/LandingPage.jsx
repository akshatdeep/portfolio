import React, { useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PageOne from "../PageOne/PageOne";
import About from "../About/About";
import Footer from "../Footer/Footer";
import RoleSlider from "../RoleSlider/RoleSlider";
import WaveLine from "../WaveLine/WaveLine";
import AnimatedText from "../Animations/AnimatedText";

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
    <div className="min-h-[60vh] lg:min-h-screen w-screen bg-black text-white overflow-x-hidden relative font-['General Sans'] absolute">
      <div className="heading pl-[3vw] pt-[4rem] leading-[9vw]">
        <div className="animetionelem w-fit overflow-hidden ml-[5rem] lg:ml-0 ">
          <h1
            ref={h1Ref}
            className="text-[10vw] font-semibold uppercase opacity-60 translate-y-[100%] lg:mt"
          >
            Mern Stack
          </h1>
        </div>
        <div className="">
          <div className="animetionelem  w-fit overflow-hidden ml-[5rem] lg:ml-0">
            <h1
              ref={h1Ref2}
              className=" text-center text-[10vw] font-semibold uppercase opacity-60 lg:pl-[20vw] translate-y-[100%]"
            >
              Developer
            </h1>
          </div>
        </div>
      </div>
      <div className="text-right lg:pt-[3vw] pr-[2vw] font-medium w-full flex flex-col items-center lg:items-end mt-[7rem] lg:mt-0">
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
      <div className="mlandingFooter flex-col w-full flex lg:flex-row justify-between items-center gap-2 px-[2vw] uppercase font-semibold lg:mt-[4rem]">
        <a className="inline-flex items-center gap-1" href="">
          <AnimatedText>download resume</AnimatedText>
          <i className="ri-arrow-right-up-line"></i>
        </a>
        <a className="inline-flex items-center gap-1" href="/viewproject">
          <AnimatedText>View Projects</AnimatedText>
          <i className="ri-arrow-right-up-line"></i>
        </a>
        <div className="flex gap-3">
          <div className="px-[6px] py-[2px] rounded-full bg-stone-400 text-black font-semibold">
            <i className="ri-arrow-down-line"></i>
          </div>
          <div className="px-[6px] py-[2px] rounded-full bg-stone-400 text-black font-semibold">
            <i className="ri-arrow-down-line"></i>
          </div>
        </div>
      </div>
      <WaveLine />
      <PageOne />
      <RoleSlider />
      <About />
      <Footer />
    </div>
  );
};

export default LandingPage;
