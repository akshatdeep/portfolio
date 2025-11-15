import React, { useEffect, useRef } from "react";
import projects from "../../_mock/mockProject";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ViewProject = () => {
  const textRefs = useRef([]);
  const mediaRefs = useRef([]); // renamed from videoRefs to mediaRefs (handles both img/video)

  textRefs.current = [];
  mediaRefs.current = [];

  const addTextRef = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  const addMediaRef = (el) => {
    if (el && !mediaRefs.current.includes(el)) mediaRefs.current.push(el);
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

    // Animate media (both video and image)
    mediaRefs.current.forEach((media) => {
      gsap.set(media, { y: 50, opacity: 0, scale: 0.95 });

      gsap.to(media, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: media,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div className="bg-black text-white w-full py-12 lg:pb-[9rem] md:pb-[8rem]">
      <h1 className="text-center mt-20 lg:mt-16 uppercase font-semibold text-2xl">
        My Collection
      </h1>

      {projects.map((project, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center mt-16 lg:mt-40 gap-6 px-6 ${
              !isEven ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Media Section */}
            <div className="w-full lg:w-1/2">
              {project.videoSrc ? (
                <video
                  ref={addMediaRef}
                  className="w-full rounded-lg object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={project.videoSrc}
                />
              ) : project.imageSrc ? (
                <img
                  ref={addMediaRef}
                  className="w-full rounded-lg object-cover"
                  src={project.imageSrc}
                  alt={project.title}
                />
              ) : null}
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
