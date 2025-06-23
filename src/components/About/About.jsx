import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(textRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-black text-white font-['General Sans'] flex flex-col lg:flex-row px-6 py-10 gap-y-10 lg:gap-x-16 items-center"
    >
      {/* Image Section */}
      <div
        ref={imgRef}
        className="w-full lg:w-1/2 flex justify-center items-center"
      >
        <img
          src="https://avatars.githubusercontent.com/u/132156274?s=400&u=7e29197823619d94b1256037b10fd0a749548379&v=4"
          alt="Profile"
          className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Text Section */}
      <div
        ref={textRef}
        className="w-full lg:w-1/2 flex flex-col justify-center items-start text-sm sm:text-base md:text-lg lg:text-xl gap-5 lg:px-7"
      >
        <p className="text-stone-500 text-base sm:text-lg">(About Me)</p>

        <h3 className="text-justify">
          I’m a self-taught programmer driven by a deep passion for continuous
          learning and problem-solving. I thrive in dynamic team environments
          and am always ready to take on new challenges. Whether working
          independently on freelance projects or collaborating within a team, I
          bring dedication, creativity, and a growth mindset to every
          opportunity.
        </h3>

        {/* Call to Action Button */}
        <button
          type="button"
          className="relative flex items-center gap-3 border border-white rounded-xl text-white font-semibold bg-black uppercase px-6 py-2 overflow-hidden transition duration-500 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white group"
        >
          <span className="z-10">Let's Talk</span>

          {/* Spinner */}
          <div className="absolute left-6 flex items-center gap-2 translate-x-full opacity-0 group-active:translate-x-0 group-active:opacity-100 transition duration-300 ease-in-out">
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span className="text-sm">Processing...</span>
          </div>

          {/* Icon */}
          <svg
            className="z-10 transition-transform duration-300 group-hover:translate-x-2 fill-white group-hover:fill-black"
            viewBox="0 0 512 512"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default About;
