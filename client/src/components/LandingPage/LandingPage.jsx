// src/components/LandingPage/LandingPage.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

import PageOne from "../PageOne/PageOne";
import About from "../About/About";
import RoleSlider from "../RoleSlider/RoleSlider";
import Footer from "../Footer/Footer";
import WaveLine from "../WaveLine/WaveLine";


import { useMouse } from "../../context/MouseContext";
import AnimatedText from "../Animations/AnimatedText";

const createChars = (text) => Array.from(text); 

const Letters = ({ text, lettersRef, className = "" }) => {
  const chars = createChars(text);
  return (
    <h1 className={`${className} inline-block`}>
      {chars.map((ch, i) => {
        const char = ch === " " ? "\u00A0" : ch;
        return (
          <span
            key={`char-${i}-${char}`}
            className="inline-block overflow-hidden"
            aria-hidden="true"
          >
            <span
              
              ref={(el) => {
                if (!lettersRef.current) lettersRef.current = [];
                lettersRef.current[i] = el;
              }}
              className="inline-block"
              style={{ display: "inline-block", transform: "translateY(100%)" }}
            >
              {char}
            </span>
          </span>
        );
      })}
    </h1>
  );
};

const LandingPage = () => {

  const letters1 = useRef([]);
  const letters2 = useRef([]);


  const pRef2 = useRef(null);
  const pRef3 = useRef(null);
  const aRef = useRef(null);
  const aRef2 = useRef(null);

  const { enlargeDot, shrinkDot } = useMouse();

  useEffect(() => {
    
    const l1 = letters1.current || [];
    const l2 = letters2.current || [];
    if (l1.length === 0 && l2.length === 0) return;

 
    gsap.set([...l1, ...l2, pRef2.current, pRef3.current, aRef.current, aRef2.current], {
      clearProps: "all",
    });

    gsap.set(l1, { yPercent: 100, opacity: 0 });
    gsap.set(l2, { yPercent: 100, opacity: 0 });
    gsap.set([pRef2.current, pRef3.current], { y: 12, opacity: 0 });
    gsap.set([aRef.current, aRef2.current], { y: 6, opacity: 0, scale: 0.995 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });


    tl.to(l1, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      stagger: { each: 0.035, from: "center" },
    });


    tl.to(
      l2,
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: { each: 0.035, from: "center" },
      },
      "-=0.55"
    );

    tl.to(
      [pRef2.current, pRef3.current],
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
      },
      "-=0.45"
    );


    tl.to(
      [aRef.current, aRef2.current],
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.08,
      },
      "-=0.35"
    );

   
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-full bg-[#0F151A] text-white overflow-x-hidden font-['General Sans']">
      {/* HERO */}
      <div className="pt-24 px-6 lg:px-12 pb-8">
        <div className="overflow-hidden w-fit mx-auto lg:mx-0">
          <Letters
            lettersRef={letters1}
            text="MERN Stack"
            className="font-semibold uppercase opacity-80 text-5xl sm:text-7xl md:text-[10vw] lg:text-[9vw]"
          />
        </div>

        <div className="overflow-hidden w-fit mx-auto lg:ml-[18vw] mt-4">
          <Letters
            lettersRef={letters2}
            text="Developer"
            className="font-semibold uppercase opacity-80 text-5xl sm:text-7xl md:text-[10vw] lg:text-[9vw]"
          />
        </div>
      </div>

      {/* SUBTEXT */}
      <div className="text-center lg:text-right px-6 flex flex-col items-center lg:items-end gap-2">
        <div className="overflow-hidden">
          <p ref={pRef2} className="uppercase text-sm sm:text-base">
            available for freelance
          </p>
        </div>

        <div className="overflow-hidden">
          <p ref={pRef3} className="uppercase text-sm sm:text-base">
            office opportunities
          </p>
        </div>
      </div>

  
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 px-6 pt-12 uppercase font-semibold">
        <a
          ref={aRef}
          href="/akshat.pdf_20251103_115057_0000-1.pdf"
          download="Akshat_Deep_Astik_Resume.pdf"
          onMouseEnter={() => enlargeDot("Download")}
          onMouseLeave={shrinkDot}
          className="inline-flex items-center gap-2 cursor-pointer text-sm sm:text-base"
        >
          <AnimatedText>download resume</AnimatedText>
          <i className="ri-arrow-right-up-line"></i>
        </a>

        <Link
          ref={aRef2}
          to="/viewproject"
          replace
          onMouseEnter={() => enlargeDot("View")}
          onMouseLeave={shrinkDot}
          className="inline-flex items-center gap-2 cursor-pointer text-sm sm:text-base"
        >
          <AnimatedText>view projects</AnimatedText>
          <i className="ri-arrow-right-up-line"></i>
        </Link>

        <div className="flex gap-3">
          {[...Array(2)].map((_, i) => (
            <button
              key={i}
              type="button"
              className="px-2 py-1 rounded-full bg-stone-400 text-black cursor-pointer"
              onMouseEnter={() => enlargeDot("Scroll")}
              onMouseLeave={shrinkDot}
            >
              <i className="ri-arrow-down-line text-lg"></i>
            </button>
          ))}
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
