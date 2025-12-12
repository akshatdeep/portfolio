import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMouse } from "../../context/MouseContext";
import LetsTalkModal from "../LetsTalkModal/LetsTalkModal";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  const { enlargeDot, shrinkDot } = useMouse();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let splitInstance;

    const ctx = gsap.context(() => {
      // === Image entrance + floating ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 85%",
        },
      });

      tl.fromTo(
        imgRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
        }
      ).to(
        imgRef.current,
        {
          y: -18,
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        },
        "+=0.2" // start float a bit after entrance
      );

      // === Split text reveal (heading) ===
      splitInstance = new SplitType(headingRef.current, {
        types: "lines",
        lineClass: "about-line",
      });

      gsap.from(".about-line", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      // === Description fade-in ===
      gsap.from(textRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
        },
      });
    }, containerRef);

    return () => {
      if (splitInstance) splitInstance.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="
          w-full 
          bg-[#0F151A] text-white 
          font-['General Sans']
          flex flex-col lg:flex-row 
          items-center 
          px-6 sm:px-10 lg:px-20 
          py-16 sm:py-20 lg:py-32 
          gap-12 lg:gap-20 
          lg:min-h-screen
        "
      >
        {/* Image */}
        <div className="flex justify-center w-full lg:w-1/2">
          <img
            ref={imgRef}
            src="https://avatars.githubusercontent.com/u/132156274?s=400&u=7e29197823619d94b1256037b10fd0a749548379&v=4"
            alt="Akshat Deep Astik"
            className="
              w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 
              rounded-full object-cover 
              shadow-[0_0_40px_rgba(255,255,255,0.08)]
              border border-white/10
            "
          />
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <p className="text-stone-400 text-sm sm:text-base tracking-wide">
            (About Me)
          </p>

          <h3
            ref={headingRef}
            className="text-lg sm:text-xl md:text-2xl leading-relaxed text-justify"
            onMouseEnter={() => enlargeDot("")}
            onMouseLeave={shrinkDot}
          >
            I’m a self-taught programmer driven by a deep passion for continuous
            learning, innovation, and building clean & scalable products. I love
            transforming ideas into reality and collaborating with ambitious
            teams to create something meaningful.
          </h3>

          {/* Description */}
          <p
            ref={textRef}
            className="text-stone-400 text-sm sm:text-base leading-relaxed"
          >
            My approach combines creativity with technical depth—focusing on
            performance, user experience, and writing maintainable code that
            lasts.
          </p>

          {/* Premium Button */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            onMouseEnter={() => enlargeDot("Talk")}
            onMouseLeave={shrinkDot}
            className="
              group
              relative flex items-center gap-3 
              px-6 py-2
              uppercase tracking-wide font-semibold
              text-white bg-black
              border border-white/20 rounded-xl
              transition duration-300
              hover:bg-zinc-900 hover:border-white/40
              hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]
              active:scale-95
            "
          >
            <span>Let's Talk</span>

            <svg
              className="transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 512 512"
              width="16"
              height="16"
              fill="white"
            >
              <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z" />
            </svg>
          </button>
        </div>
      </section>

      {modalOpen && <LetsTalkModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default About;
