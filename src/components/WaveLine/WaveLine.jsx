import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import mockImages from "../../_mock/mockImages";
import mockQuotes from "../../_mock/mockQuotes";
import mockRoles from "../../_mock/moackRoles";

const WaveLine = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);
  const roleRef = useRef(null);

  const points = useRef([]);
  const baseY = useRef(0);
  const animationFrame = useRef(null);

  const [index, setIndex] = useState(1); // active quote/image index

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      baseY.current = canvas.height / 2;
      initPoints();
    };

    const initPoints = () => {
      const pointCount = 200;
      const spacing = canvas.width / (pointCount - 1);

      points.current = Array.from({ length: pointCount }, (_, i) => ({
        x: i * spacing,
        y: baseY.current
      }));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(points.current[0].x, points.current[0].y);

      for (let i = 1; i < points.current.length; i++) {
        ctx.lineTo(points.current[i].x, points.current[i].y);
      }

      ctx.strokeStyle = "#b3b3b3";
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrame.current = requestAnimationFrame(draw);
    };

    draw();

    /* ============================
         HOVER WAVE + ANIMATIONS
    ============================= */
    const triggerWave = (hoverX, hoverY) => {
      const h = canvas.height;
      const centerY = baseY.current;
      const normalized = (hoverY - centerY) / (h / 2);
      const amplitude = gsap.utils.clamp(-1, 1, normalized) * 50;

      const spread = 180;
      const sigma = spread / 2;

      const newIndex = normalized < -0.3 ? 0 : normalized > 0.3 ? 2 : 1;

      if (newIndex !== index) {
        setIndex(newIndex);

        // Enhanced fade + scale for text
        const animateTextChange = () => {
          quoteRef.current.textContent = mockQuotes[newIndex].text;
          roleRef.current.textContent = mockRoles[newIndex].title;

          gsap.fromTo(
            [quoteRef.current, roleRef.current],
            { y: 10, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            }
          );
        };

        gsap.to([quoteRef.current, roleRef.current], {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
          onComplete: animateTextChange
        });
      }

      // Parallax image movement
      gsap.to(imageRef.current, {
        y: normalized * -20,
        rotate: normalized * 3,
        duration: 0.4,
        ease: "power3.out"
      });

      // Wave ripple logic
      points.current.forEach((point) => {
        const dx = point.x - hoverX;
        const gaussian = Math.exp(-(dx * dx) / (2 * sigma * sigma));
        const bump = amplitude * gaussian;

        gsap.to(point, {
          y: baseY.current + bump,
          duration: 0.25,
          ease: "power2.out"
        });
      });
    };

    /* ============================
          RESET WAVE + CONTENT
    ============================= */
    const resetWave = () => {
      points.current.forEach((point) => {
        gsap.to(point, {
          y: baseY.current,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      gsap.to(imageRef.current, {
        y: 0,
        rotate: 0,
        duration: 0.4,
        ease: "power3.out"
      });

      gsap.to([quoteRef.current, roleRef.current], {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });

      setIndex(1);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      triggerWave(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", resetWave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", resetWave);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [index]);

  return (
    <div className="w-full h-[70vh] sm:h-[60vh] mt-20 relative overflow-hidden">

      {/* Floating Image with glow */}
      <img
        ref={imageRef}
        src={mockImages[index].src}
        alt={mockImages[index].label}
        className="
          absolute 
          top-24 sm:top-8
          left-1/2 -translate-x-1/2 
          z-10 pointer-events-none 
          border border-[#999] shadow-lg
          w-[50vw] sm:w-[35vw] max-w-[180px]
          transition-all duration-300
        "
        style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))" }}
      />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* QUOTE */}
      <p
        ref={quoteRef}
        className="
          absolute 
          left-4 sm:left-6 
          top-[50%] sm:top-[40%] 
          text-xs sm:text-sm 
          text-white font-medium 
          pointer-events-none 
          max-w-[70%] sm:max-w-[50%]
        "
      >
        {mockQuotes[1].text}
      </p>

      {/* ROLE */}
      <p
        ref={roleRef}
        className="
          absolute 
          right-4 sm:right-6 
          top-[62%] sm:top-[52%] 
          text-xs sm:text-sm 
          text-white font-medium 
          pointer-events-none 
          max-w-[40%]
        "
      >
        {mockRoles[1].title}
      </p>
    </div>
  );
};

export default WaveLine;
