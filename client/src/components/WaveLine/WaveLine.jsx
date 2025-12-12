// src/components/WaveLine/WaveLine.jsx
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

  const [index, setIndex] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      baseY.current = canvas.height / 2;
      initPoints();

      // Align image to wave baseline (baseY)
      if (imageRef.current) {
        imageRef.current.style.left = "50%";
        imageRef.current.style.top = `${baseY.current}px`;
        imageRef.current.style.transform = "translate(-50%, -50%)";
      }
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

    const triggerWave = (hoverX, hoverY) => {
      const h = canvas.height;
      const centerY = baseY.current;
      const normalized = (hoverY - centerY) / (h / 2);
      const amplitude = Math.max(-1, Math.min(1, normalized)) * 50;

      const spread = 180;
      const sigma = spread / 2;

      const newIndex = normalized < -0.3 ? 0 : normalized > 0.3 ? 2 : 1;

      if (newIndex !== index) {
        setIndex(newIndex);

        const animateTextChange = () => {
          if (quoteRef.current) quoteRef.current.textContent = mockQuotes[newIndex].text;
          if (roleRef.current) roleRef.current.textContent = mockRoles[newIndex].title;

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

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: normalized * -20,
          rotate: normalized * 3,
          duration: 0.4,
          ease: "power3.out",
          onUpdate: () => {
            // keep transform origin consistent while animating
            imageRef.current.style.transform = `translate(-50%, -50%) translateY(${gsap.getProperty(imageRef.current, "y")}px) rotate(${gsap.getProperty(imageRef.current, "rotate")}deg)`;
          }
        });
      }

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

    const resetWave = () => {
      points.current.forEach((point) => {
        gsap.to(point, {
          y: baseY.current,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: 0,
          rotate: 0,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            if (imageRef.current) {
              imageRef.current.style.transform = "translate(-50%, -50%)";
            }
          }
        });
      }

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
      <img
        ref={imageRef}
        src={mockImages[index].src}
        alt={mockImages[index].label}
        className="
          absolute
          z-10 pointer-events-none
          border border-[#999] shadow-lg
          w-[60vw] sm:w-[45vw] md:w-[35vw] lg:w-[30vw] xl:w-[22vw]
          max-w-[300px] sm:max-w-[220px]
          rounded-md
          transition-all duration-300
          object-cover
        "
        style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.25))" }}
      />

      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

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
          z-20
          hidden
          md:inline-block
          log:inline-block
        "
      >
        {mockQuotes[1].text}
      </p>

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
          z-20
          hidden
          md:inline-block
          log:inline-block
        "
      >
        {mockRoles[1].title}
      </p>
    </div>
  );
};

export default WaveLine;
