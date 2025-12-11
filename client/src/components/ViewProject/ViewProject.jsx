import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import API from "../../api/axios"; // ✅ use your axios instance

gsap.registerPlugin(ScrollTrigger);

const ViewProject = () => {
  const [projects, setProjects] = useState([]);

  const textRefs = useRef([]);
  const mediaRefs = useRef([]);

  // same pattern as your working version
  textRefs.current = [];
  mediaRefs.current = [];

  const addTextRef = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  const addMediaRef = (el) => {
    if (el && !mediaRefs.current.includes(el)) mediaRefs.current.push(el);
  };

  // 🔹 Fetch projects from backend and transform to match mockProject shape
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        const apiProjects = res.data.projects || res.data;

        // map backend data -> add imageSrc / videoSrc like your mock
        const mapped = apiProjects.map((p) => {
          const image = p.media?.find((m) => m.type === "image");
          const video = p.media?.find((m) => m.type === "video");

          return {
            ...p,
            imageSrc: image?.url || null,
            videoSrc: video?.url || null,
          };
        });

        setProjects(mapped);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  // 🔹 Run your GSAP animations once projects are loaded
  useEffect(() => {
    if (!projects.length) return;

    // Animate text (line by line)
    textRefs.current.forEach((el) => {
      if (!el) return;

      const split = new SplitType(el, {
        types: "lines",
        lineClass: "lineChild",
      });
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
      if (!media) return;

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
  }, [projects]); // 🔑 run after projects render

  return (
    <div className="bg-black text-white w-full py-12 lg:pb-[9rem] md:pb-[8rem]">
      <h1 className="text-center mt-20 lg:mt-16 uppercase font-semibold text-2xl">
        My Collection
      </h1>

      {projects.map((project, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={project._id || index}
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

              {/* GitHub Button */}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  {/* Simple GitHub icon (inline SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 .198a8 8 0 0 0-2.528 15.59c.4.074.547-.174.547-.385v-1.347c-2.225.485-2.695-1.073-2.695-1.073-.364-.924-.888-1.171-.888-1.171-.726-.496.055-.486.055-.486.803.057 1.225.825 1.225.825.714 1.224 1.87.87 2.328.665.074-.517.28-.87.51-1.07-1.777-.202-3.644-.889-3.644-3.951 0-.873.31-1.588.823-2.148-.083-.205-.357-1.025.078-2.14 0 0 .672-.215 2.2.82a7.59 7.59 0 0 1 4 0c1.528-1.036 2.2-.82 2.2-.82.435 1.115.161 1.935.08 2.14.512.56.822 1.275.822 2.148 0 3.072-1.87 3.747-3.65 3.944.288.248.544.736.544 1.486v2.204c0 .213.146.462.55.384A8 8 0 0 0 8 .196Z" />
                  </svg>
                  <span>View Code</span>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewProject;
