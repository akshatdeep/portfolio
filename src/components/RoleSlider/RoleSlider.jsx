import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
  "MERN Stack Dev",
];

const RoleSlider = () => {
  const wrapperRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  const speed = useRef(1);      // base auto speed
  const scrollBoost = useRef(0); // scroll force
  const direction = useRef(1);  // 1 = left, -1 = right

  const widthRef = useRef(0);

  // Position updater
  const update = () => {
    const totalSpeed = speed.current + scrollBoost.current;
    const move = totalSpeed * direction.current;

    track1Ref.current.x += move;
    track2Ref.current.x += move;

    const w = widthRef.current;

    // LEFT LOOP
    if (track1Ref.current.x <= -w) {
      track1Ref.current.x = track2Ref.current.x + w;
    }
    if (track2Ref.current.x <= -w) {
      track2Ref.current.x = track1Ref.current.x + w;
    }

    // RIGHT LOOP
    if (track1Ref.current.x >= w) {
      track1Ref.current.x = track2Ref.current.x - w;
    }
    if (track2Ref.current.x >= w) {
      track2Ref.current.x = track1Ref.current.x - w;
    }

    gsap.set(track1Ref.current, { x: track1Ref.current.x });
    gsap.set(track2Ref.current, { x: track2Ref.current.x });

    // Slow down scroll boost
    scrollBoost.current *= 0.9;
    if (Math.abs(scrollBoost.current) < 0.02) scrollBoost.current = 0;
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const t1 = track1Ref.current;
    const t2 = track2Ref.current;

    // Measure and duplicate width
    const measureWidth = () => {
      widthRef.current = t1.offsetWidth;
      t1.x = 0;
      t2.x = widthRef.current;
      gsap.set(t1, { x: 0 });
      gsap.set(t2, { x: widthRef.current });
    };

    measureWidth();
    window.addEventListener("resize", measureWidth);

    // Scroll listener
    const handleScroll = (e) => {
      direction.current = e.deltaY > 0 ? -1 : 1;
      scrollBoost.current += Math.min(Math.abs(e.deltaY) * 0.004, 2);
    };

    wrapper.addEventListener("wheel", handleScroll, { passive: false });

    // GSAP update loop
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      wrapper.removeEventListener("wheel", handleScroll);
      window.removeEventListener("resize", measureWidth);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden bg-black border-y border-white py-10 select-none mt-10"
    >
      {/* Track 1 */}
      <div
        ref={track1Ref}
        className="absolute top-1/2 -translate-y-1/2 left-0 flex whitespace-nowrap text-white text-xl md:text-4xl font-semibold"
      >
        {roles.map((r, i) => (
          <span key={i} className="mx-10 opacity-80 hover:opacity-100 transition">
            {r}
          </span>
        ))}
      </div>

      {/* Track 2 (clone) */}
      <div
        ref={track2Ref}
        className="absolute top-1/2 -translate-y-1/2 left-0 flex whitespace-nowrap text-white text-xl md:text-4xl font-semibold"
      >
        {roles.map((r, i) => (
          <span key={i} className="mx-10 opacity-80 hover:opacity-100 transition">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RoleSlider;
