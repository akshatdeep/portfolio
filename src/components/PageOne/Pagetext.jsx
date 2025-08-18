import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PageHover from "./PageHover";
import { motion } from "framer-motion";

const Pagetext = () => {
  const hoverRef = useRef(null);
  const parentRef = useRef(null);
  const [ImageScroll, setImageScroll] = useState(0);
  const navigate = useNavigate();

  const textArry = [
    "RealEstate website",
    "Real Time chatapp",
    "bloggin platform",
    "animated website",
  ];

  const imageUrls = [
    "https://res.cloudinary.com/dt85gvalz/image/upload/v1750924255/Screenshot_2024-11-26_152132_lzoxfy.png",
    "https://res.cloudinary.com/dt85gvalz/image/upload/v1750924258/pixelcut-export_viemjd.png",
    "https://res.cloudinary.com/dt85gvalz/image/upload/v1750924258/blog_bubizq.png",
    "https://res.cloudinary.com/dt85gvalz/image/upload/v1750924258/animated_website.png",
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

  // On click handler to navigate to view project
  const handleClick = () => {
    navigate("/viewproject");
  };

  return (
    <div
      ref={parentRef}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onMouseMove={mouseMove}
      onClick={handleClick}
      className='font-["General Sans"] relative cursor-pointer'
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
          {imageUrls.map((url, i) => (
            <img
              key={i}
              className="h-full w-full object-center object-cover"
              src={url}
              alt={`project-${i}`}
              draggable={false}
            />
          ))}
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
