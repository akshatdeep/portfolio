import React, { useEffect, useRef } from "react";
import projects from "../../_mock/mockProject";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ViewProject = () => {
  const textRefs = useRef([]);
  const videoRefs = useRef([]);

  textRefs.current = [];
  videoRefs.current = [];

  const addTextRef = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  const addVideoRef = (el) => {
    if (el && !videoRefs.current.includes(el)) videoRefs.current.push(el);
  };

  useEffect(() => {
    // Animate text (line by line)
    textRefs.current.forEach((el) => {
      const split = new SplitType(el, { types: "lines", lineClass: "lineChild" });
      const lines = el.querySelectorAll(".lineChild");

      gsap.set(lines, { y: "100%", opacity: 0 });

      gsap.to(lines, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // Animate video
    videoRefs.current.forEach((video) => {
      gsap.set(video, { y: 50, opacity: 0, scale: 0.95 });

      gsap.to(video, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: video,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div className="bg-black text-white w-full py-12 lg:pb-[9rem] md:pb-[8rem]">
      <h1 className="text-center mt-12 lg:mt-16 uppercase font-semibold text-2xl">
        My Collection
      </h1>

      {projects.map((project, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center mt-20 lg:mt-40 gap-6 px-6 ${
              !isEven ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Video Section */}
            <div className="w-full lg:w-1/2">
              <video
                ref={addVideoRef}
                className="w-full rounded-lg object-cover"
                autoPlay
                loop
                muted
                playsInline
                src={project.videoSrc}
              />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2
                ref={addTextRef}
                className="text-xl font-semibold uppercase leading-snug overflow-hidden"
              >
                {project.title}
              </h2>
              <p
                ref={addTextRef}
                className="text-white text-base leading-relaxed overflow-hidden mt-4"
              >
                {project.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewProject;
