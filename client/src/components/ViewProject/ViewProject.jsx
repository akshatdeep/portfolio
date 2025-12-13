// src/components/ViewProject/ViewProject.jsx
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import API from "../../api/axios";
import { useMouse } from "../../context/MouseContext";

gsap.registerPlugin(ScrollTrigger);

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const textRefs = useRef([]);
  const mediaRefs = useRef([]);
  const { enlargeDot, shrinkDot } = useMouse();


  textRefs.current = [];
  mediaRefs.current = [];

  const addTextRef = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  const addMediaRef = (el) => {
    if (el && !mediaRefs.current.includes(el)) mediaRefs.current.push(el);
  };


  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        const apiProjects = res.data.projects || res.data;

        const mapped = apiProjects.map((p) => {
          const image = p.media?.find((m) => m.type === "image");
          const video = p.media?.find((m) => m.type === "video");

          return {
            ...p,
            imageSrc: image?.url || null,
            videoSrc: video?.url || null,
          };
        });

        if (!mounted) return;
        setProjects(mapped);
   
      } catch (err) {
        console.error("Error fetching projects:", err);
        if (mounted) {
          setProjects([]);
          setLoading(false);
          
          requestAnimationFrame(() => window.dispatchEvent(new Event("routeReady")));
        }
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);


  useEffect(() => {
    if (!projects.length) return;

    let cancelled = false;

   
    const medias = (mediaRefs.current || []).filter(Boolean);
    if (medias.length === 0) {
      
      setLoading(false);
  
      requestAnimationFrame(() => {
        setTimeout(() => window.dispatchEvent(new Event("routeReady")), 40);
      });
      return;
    }

    let remaining = medias.length;
    const cleanups = [];

    const maybeReady = () => {
      remaining -= 1;
      if (remaining <= 0 && !cancelled) {
        setLoading(false);
        
        requestAnimationFrame(() => {
          setTimeout(() => window.dispatchEvent(new Event("routeReady")), 40);
        });
      }
    };

    medias.forEach((el) => {
      if (!el) {
        maybeReady();
        return;
      }

      if (el.tagName === "IMG") {
        if (el.complete && el.naturalWidth !== 0) {
          maybeReady();
        } else {
          const onLoad = () => {
            el.removeEventListener("load", onLoad);
            el.removeEventListener("error", onError);
            maybeReady();
          };
          const onError = () => {
            el.removeEventListener("load", onLoad);
            el.removeEventListener("error", onError);
            maybeReady();
          };
          el.addEventListener("load", onLoad);
          el.addEventListener("error", onError);
          cleanups.push(() => {
            el.removeEventListener("load", onLoad);
            el.removeEventListener("error", onError);
          });
        }
      } else if (el.tagName === "VIDEO") {
        // for videos, wait for metadata to be available
        if (el.readyState >= 1) {
          maybeReady();
        } else {
          const onMeta = () => {
            el.removeEventListener("loadedmetadata", onMeta);
            el.removeEventListener("error", onErr);
            maybeReady();
          };
          const onErr = () => {
            el.removeEventListener("loadedmetadata", onMeta);
            el.removeEventListener("error", onErr);
            maybeReady();
          };
          el.addEventListener("loadedmetadata", onMeta);
          el.addEventListener("error", onErr);
          cleanups.push(() => {
            el.removeEventListener("loadedmetadata", onMeta);
            el.removeEventListener("error", onErr);
          });
        }
      } else {
     
        maybeReady();
      }
    });

    
    const fallback = setTimeout(() => {
      if (!cancelled) {
        console.warn("routeReady fallback fired — some media may have failed to load");
        setLoading(false);
        requestAnimationFrame(() => {
          setTimeout(() => window.dispatchEvent(new Event("routeReady")), 40);
        });
      }
    }, 4000); 

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      clearTimeout(fallback);
    };
  }, [projects]);

 
  useLayoutEffect(() => {
    if (!projects.length || loading) return; 

    const ctx = gsap.context(() => {
      const splitInstances = [];

      
      (textRefs.current || [])
        .filter(Boolean)
        .forEach((el) => {
          try {
            const split = new SplitType(el, {
              types: "lines",
              lineClass: "lineChild",
            });
            splitInstances.push(split);

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
          } catch (err) {
            console.warn("SplitType failed for element, falling back:", err);
          
            gsap.fromTo(
              el,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });

      // MEDIA: animate images and videos
      (mediaRefs.current || [])
        .filter(Boolean)
        .forEach((media) => {
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

      
      ScrollTrigger.refresh();

    
      return () => {
        splitInstances.forEach((s) => {
          try {
            s.revert();
          } catch (e) {
            
          }
        });
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => ctx.revert();
  }, [projects, loading]);

  
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="h-48 bg-gray-800 rounded-lg" />
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#0F151A] text-white w-full py-12 lg:pb-[9rem] md:pb-[8rem]">
      <h1 className="text-center mt-20 lg:mt-16 uppercase font-semibold text-2xl">
        My Collection
      </h1>

      {loading && <SkeletonGrid />}

      {!loading &&
        projects.map((project, index) => {
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

           
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2
                  ref={addTextRef}
                  className="text-xl font-semibold uppercase leading-snug overflow-hidden"
                  onMouseEnter={() => enlargeDot("")}
                  onMouseLeave={shrinkDot}
                >
                  {project.title}
                </h2>
                <p
                  ref={addTextRef}
                  className="text-white text-base leading-relaxed overflow-hidden mt-4"
                  onMouseEnter={() => enlargeDot("")}
                  onMouseLeave={shrinkDot}
                >
                  {project.description}
                </p>

                
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
                    onMouseEnter={() => enlargeDot("")}
                    onMouseLeave={shrinkDot}
                  >
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
