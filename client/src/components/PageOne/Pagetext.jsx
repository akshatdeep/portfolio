import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PageHover from "./PageHover";
import { motion } from "framer-motion";

const Pagetext = () => {
  const hoverRef = useRef(null);
  const parentRef = useRef(null);
  const navigate = useNavigate();

  const [ImageScroll, setImageScroll] = useState(0);

  const imageUrls = [
    "https://res.cloudinary.com/dt85gvalz/image/upload/v1750924255/Screenshot_2024-11-26_152132_lzoxfy.png",
    "https://res.cloudinary.com/dt85gvalz/image/upload/v1750924258/pixelcut-export_viemjd.png",
    "https://res.cloudinary.com/dt85gvalz/image/upload/v1750924258/blog_bubizq.png",
    "https://res.cloudinary.com/dt85gvalz/image/upload/v1765279512/Screenshot_from_2025-12-09_16-54-50_le2ck4.png",
  ];

  const textArry = [
    "RealEstate Website",
    "Real Time Chat App",
    "Blogging Platform",
    "Ochi Clone"
  ];

  // initial hidden state
  useGSAP(() => {
    gsap.set(hoverRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.5,
      opacity: 0
    });
  }, []);

  const mouseEnter = () => {
    gsap.to(hoverRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const mouseLeave = () => {
    gsap.to(hoverRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const mouseMove = (e) => {
    const rect = parentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(hoverRef.current, {
      x,
      y,
      duration: 0.15,
      ease: "power3.out",
    });
  };

  const handleClick = () => navigate("/viewproject");

  return (
    <div
      ref={parentRef}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onMouseMove={mouseMove}
      onClick={handleClick}
      className="relative cursor-pointer select-none"
    >
      {/* Floating Hover Preview */}
      <div
        ref={hoverRef}
        className="
          absolute z-10 pointer-events-none overflow-hidden
          rounded-xl shadow-xl border border-white/20
          backdrop-blur-lg bg-white/10 
          h-[20vw] w-[35vw]
          md:h-[20vw] md:w-[35vw]
          lg:h-[20vw] lg:w-[45vw]
        "
      >
        <motion.div
          animate={{ transform: `translateY(-${ImageScroll}%)` }}
          className="h-full w-full"
        >
          {imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              draggable={false}
              className="h-full w-full object-cover p-2"
            />
          ))}
        </motion.div>
      </div>

      {/* Text List */}
      <div className="mt-10 text-[#999999] ">
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
