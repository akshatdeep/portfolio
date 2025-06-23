import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const baseRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "MERN Stack Dev",
];

const RoleSlider = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const scrollVelocityRef = useRef(0);
  const directionRef = useRef(1);
  const requestRef = useRef(null);
  const lastScrollTimeRef = useRef(0);

  // Animation constants
  const BASE_SPEED = 1;
  const SCROLL_SENSITIVITY = 2;
  const FRICTION = 0.92;

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    // Create infinite content by duplicating base roles
    const createInfiniteContent = () => {
      const containerWidth = container.offsetWidth;
      const itemsNeeded = Math.ceil(containerWidth / 200) * 3; // Approximate based on item width
      let infiniteRoles = [];
      
      for (let i = 0; i < itemsNeeded; i++) {
        infiniteRoles.push(...baseRoles);
      }
      
      return infiniteRoles;
    };

    // Set initial content
    content.innerHTML = createInfiniteContent()
      .map(role => `<span class="min-w-max opacity-80 hover:opacity-100 transition-opacity duration-300 mr-10">${role}</span>`)
      .join('');

    const contentWidth = content.scrollWidth;
    const segmentWidth = contentWidth / 2;

    // Initialize animation
    gsap.set(content, { x: 0 });

    animationRef.current = gsap.to(content, {
      x: `-=${segmentWidth}`,
      duration: 100,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % segmentWidth),
      },
    });

    // Handle wheel events
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      const timeDiff = now - lastScrollTimeRef.current;
      
      if (timeDiff > 16) { // ~60fps
        const direction = Math.sign(e.deltaY);
        scrollVelocityRef.current = -direction * SCROLL_SENSITIVITY;
        lastScrollTimeRef.current = now;
      }
    };

    // Apply scroll velocity
    const applyScrollVelocity = () => {
      if (scrollVelocityRef.current !== 0) {
        directionRef.current = Math.sign(scrollVelocityRef.current);
        animationRef.current.timeScale(directionRef.current * BASE_SPEED + scrollVelocityRef.current);
        
        scrollVelocityRef.current *= FRICTION;
        if (Math.abs(scrollVelocityRef.current) < 0.05) {
          scrollVelocityRef.current = 0;
        }
      }
      requestRef.current = requestAnimationFrame(applyScrollVelocity);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    requestRef.current = requestAnimationFrame(applyScrollVelocity);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(requestRef.current);
      animationRef.current?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full mt-10 overflow-hidden bg-black border-y border-white py-6 select-none"
    >
      <div
        ref={contentRef}
        className="flex whitespace-nowrap text-white text-lg md:text-2xl font-medium px-4 will-change-transform"
      >
        {/* Content is dynamically inserted via DOM manipulation */}
      </div>
    </div>
  );
};

export default RoleSlider;