import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

import PageOne from "../PageOne/PageOne";
import About from "../About/About";
import RoleSlider from "../RoleSlider/RoleSlider";
import Footer from "../Footer/Footer";
import WaveLine from "../WaveLine/WaveLine";
import AnimatedText from "../Animations/AnimatedText";

import { useMouse } from "../../context/MouseContext";

const LandingPage = () => {
  const h1Ref = useRef(null);
  const h1Ref2 = useRef(null);
  const pRef2 = useRef(null);
  const pRef3 = useRef(null);
  const aRef = useRef(null);
  const aRef2 = useRef(null);

  const { enlargeDot, shrinkDot } = useMouse();

  // =========================
  // GSAP HERO ANIMATIONS
  // =========================
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(h1Ref.current, {
        y: 0,
        duration: 0.7,
        ease: "slow(0.7, 0.7, false)",
      })
        .to(h1Ref2.current, {
          y: 0,
          duration: 0.7,
          ease: "slow(0.7, 0.7, false)",
        })
        .to(pRef2.current, {
          y: 0,
          duration: 0.5,
          ease: "slow(0.7, 0.7, false)",
        })
        .to(pRef3.current, {
          y: 0,
          duration: 0.5,
          ease: "slow(0.7, 0.7, false)",
        })
        .from([aRef.current, aRef2.current], {
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        });
    },
    { dependencies: [] } // run once on mount
  );

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden font-['General Sans']">
      {/* =========================
           HERO SECTION
      ========================== */}
      <div className="pt-24 px-6 lg:px-12 pb-8">
        {/* BIG Heading 1 */}
        <div className="overflow-hidden w-fit mx-auto lg:mx-0">
          <h1
            ref={h1Ref}
            className="
              font-semibold uppercase opacity-60 translate-y-full
              text-5xl sm:text-7xl md:text-[10vw] lg:text-[9vw]
            "
          >
            MERN Stack
          </h1>
        </div>

        {/* BIG Heading 2 — offset on desktop */}
        <div className="overflow-hidden w-fit mx-auto lg:ml-[18vw] mt-4">
          <h1
            ref={h1Ref2}
            className="
              font-semibold uppercase opacity-60 translate-y-full
              text-5xl sm:text-7xl md:text-[10vw] lg:text-[9vw]
            "
          >
            Developer
          </h1>
        </div>
      </div>

      {/* =========================
           SUB TEXT
      ========================== */}
      <div className="text-center lg:text-right px-6 flex flex-col items-center lg:items-end gap-2">
        <div className="overflow-hidden">
          <p
            ref={pRef2}
            className="uppercase text-sm sm:text-base translate-y-[-100%]"
          >
            available for freelance
          </p>
        </div>

        <div className="overflow-hidden">
          <p
            ref={pRef3}
            className="uppercase text-sm sm:text-base translate-y-[-100%]"
          >
            office opportunities
          </p>
        </div>
      </div>

      {/* =========================
           CTA BUTTONS
      ========================== */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 px-6 pt-12 uppercase font-semibold">
        {/* Resume */}
        <a
          ref={aRef}
          href="/akshat.pdf_20251103_115057_0000-1.pdf" // ensure this file is in /public
          download="Akshat_Deep_Astik_Resume.pdf"
          onMouseEnter={() => enlargeDot("Download")}
          onMouseLeave={shrinkDot}
          className="inline-flex items-center gap-2 cursor-pointer text-sm sm:text-base"
        >
          <AnimatedText>download resume</AnimatedText>
          <i className="ri-arrow-right-up-line"></i>
        </a>

        {/* View Projects - SPA navigation with Link */}
        <Link
          to="/viewproject"
          replace // (optional) prevents opening new browser history entry
          onMouseEnter={() => enlargeDot("View")}
          onMouseLeave={shrinkDot}
          className="inline-flex items-center gap-2 cursor-pointer text-sm sm:text-base"
        >
          <AnimatedText>view projects</AnimatedText>
          <i className="ri-arrow-right-up-line"></i>
        </Link>

        {/* Scroll Indicators */}
        <div className="flex gap-3">
          {[...Array(2)].map((_, i) => (
            <button
              key={i}
              type="button"
              className="p-2 rounded-full bg-stone-400 text-black cursor-pointer"
              onMouseEnter={() => enlargeDot("Scroll")}
              onMouseLeave={shrinkDot}
            >
              <i className="ri-arrow-down-line text-lg"></i>
            </button>
          ))}
        </div>
      </div>

      {/* =========================
           SECTIONS BELOW HERO
      ========================== */}
      <WaveLine />
      <PageOne />
      <RoleSlider />
      <About />
      <Footer />
    </div>
  );
};

export default LandingPage;
