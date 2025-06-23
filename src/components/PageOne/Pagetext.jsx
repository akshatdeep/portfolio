import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PageHover from "./PageHover";
import { motion } from "framer-motion";

const Pagetext = () => {
  const hoverRef = useRef(null);
  const parentRef = useRef(null);
  const [ImageScroll, setImageScroll] = useState(0);

  const textArry = [
    "RealEstate website",
    "Real Time chatapp",
    "bloggin platform",
    "animated website",
  ];

  // Animate scale on mouse enter
  const mouseEnter = () => {
    gsap.to(hoverRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Animate scale on mouse leave
  const mouseLeave = () => {
    gsap.to(hoverRef.current, {
      scale: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Set initial transform center
  useGSAP(() => {
    gsap.set(hoverRef.current, {
      xPercent: -50,
      yPercent: -50,
    });
  }, []);

  // Move hover image on mouse move
  const mouseMove = (e) => {
    const rect = parentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(hoverRef.current, {
      x,
      y,
      duration: 0.2,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={parentRef}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onMouseMove={mouseMove} // ✅ Mouse move now active
      className='font-["General Sans"] relative'
    >
      <div
        ref={hoverRef}
        className="overflow-hidden rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm bg-white/10
             transition-transform duration-200 ease-out
             imgdiv h-[20vw] w-[40vw] z-10 absolute 
             -translate-x-1/2 -translate-y-1/2 scale-0 pointer-events-none"
      >
        <motion.div
          animate={{ transform: `translateY(-${ImageScroll}%)` }}
          className="h-full w-full bg-slate-700"
        >
          <img
            className="h-full w-full object-center object-cover"
            src="public/images/Screenshot 2024-11-26 152132.png"
            alt=""
          />
          <img
            className="h-full w-full object-cover"
            src="public/images/pixelcut-export.png"
            alt=""
          />
          <img
            className="h-full w-full object-center object-cover"
            src="public/images/blog.png"
            alt=""
          />
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1637747022694-92c8cbc90a38?q=80&w=1417&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </motion.div>
      </div>

      <div>
        {textArry.map((elem, index) => (
          <PageHover
            key={index}
            translate={index * 100}
            h1={elem}
            setImageScroll={setImageScroll}
          />
        ))}
      </div>
    </div>
  );
};

export default Pagetext;
