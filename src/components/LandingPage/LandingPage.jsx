import React, { useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PageOne from "../PageOne/PageOne";
import About from "../About/About";
import { useMouse } from "../../App";
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
  const { enlargeDot, shrinkDot } = useMouse();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(h1Ref.current, {
      y: 0,
      duration: 0.7,
      ease: "slow(0.7,0.7,false)",
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
    <div className="relative w-full bg-black text-white overflow-x-hidden font-['General Sans']">
      {/* Heading Section */}
      <div className="pt-16 px-6 lg:px-12 leading-none text-center lg:text-left">
        <div className="overflow-hidden w-fit mx-auto lg:ml-0">
          <h1
            ref={h1Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[9vw] font-semibold uppercase opacity-60 translate-y-full"
          >
            Mern Stack
          </h1>
        </div>
        <div className="overflow-hidden w-fit mx-auto lg:ml-[20vw] mt-4">
          <h1
            ref={h1Ref2}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[9vw] font-semibold uppercase opacity-60 translate-y-full"
          >
            Developer
          </h1>
        </div>
      </div>

      {/* Subtext */}
      <div className="text-center lg:text-right pt-12 px-6 flex flex-col items-center lg:items-end">
        <div className="overflow-hidden">
          <p ref={pRef2} className="uppercase text-base translate-y-[-100%]">
            available for freelance
          </p>
        </div>
        <div className="overflow-hidden mt-2">
          <p ref={pRef3} className="uppercase text-base translate-y-[-100%]">
            office opportunities
          </p>
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-6 pt-12 uppercase font-semibold">
        <a
          ref={aRef}
          href=""
          onMouseEnter={() => enlargeDot("")}
          onMouseLeave={shrinkDot}
          className="inline-flex items-center gap-2 cursor-pointer"
        >
          <AnimatedText>download resume</AnimatedText>
          <i className="ri-arrow-right-up-line"></i>
        </a>

        <a
          ref={aRef2}
          href="/viewproject"
          onMouseEnter={() => enlargeDot("")}
          onMouseLeave={shrinkDot}
          className="inline-flex items-center gap-2 cursor-pointer"
        >
          <AnimatedText>View Projects</AnimatedText>
          <i className="ri-arrow-right-up-line"></i>
        </a>

        <div className="flex gap-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="p-2 rounded-full bg-stone-400 text-black cursor-pointer"
              onMouseEnter={() => enlargeDot("Scroll")}
              onMouseLeave={shrinkDot}
            >
              <i className="ri-arrow-down-line"></i>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Line and Sections */}
      <WaveLine />
      <PageOne />
      <RoleSlider />
      <About />
      <Footer />
    </div>
  );
};

export default LandingPage;
