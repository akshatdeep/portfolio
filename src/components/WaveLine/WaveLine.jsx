import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import mockImages from "../../_mock/mockImages";
import mockQuotes from "../../_mock/mockQuotes";
import mockRoles from "../../_mock/moackRoles"; // ✅ make sure file name is correct


const WaveLine = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);
  const roleRef = useRef(null);
  const points = useRef([]);
  const baseY = useRef(0);
  const animationFrame = useRef(null);
  const [index, setIndex] = useState(1); // shared index

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
      const pointCount = 150;
      const spacing = canvas.width / (pointCount - 1);
      points.current = [];
      for (let i = 0; i < pointCount; i++) {
        points.current.push({ x: i * spacing, y: baseY.current });
      }
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
      ctx.strokeStyle = "#999999";
      ctx.lineWidth = 2;
      ctx.stroke();
      animationFrame.current = requestAnimationFrame(draw);
    };

    draw();

    const triggerSmoothOval = (hoverX, hoverY) => {
      const canvasHeight = canvas.height;
      const centerY = baseY.current;
      const distanceFromCenter = hoverY - centerY;
      const normalized = distanceFromCenter / (canvasHeight / 2);
      const amplitude = gsap.utils.clamp(-1, 1, normalized) * 60;
      const spread = 200;
      const sigma = spread / 2;

      const newIndex = normalized < -0.3 ? 0 : normalized > 0.3 ? 2 : 1;

      if (newIndex !== index) {
        setIndex(newIndex);

        if (quoteRef.current && roleRef.current) {
          gsap.to([quoteRef.current, roleRef.current], {
            opacity: 0,
            y: "+=10",
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              quoteRef.current.textContent = mockQuotes[newIndex]?.text || "";
              roleRef.current.textContent = mockRoles[newIndex]?.title || "";

              gsap.fromTo(
                [quoteRef.current, roleRef.current],
                { y: "-10", opacity: 0 },
                {
                  y: "0",
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out",
                }
              );
            },
          });
        }
      }

      points.current.forEach((point) => {
        gsap.killTweensOf(point);
        const dx = point.x - hoverX;
        const gauss = Math.exp(-(dx * dx) / (2 * sigma * sigma));
        const bump = amplitude * gauss;
        gsap.to(point, {
          y: baseY.current + bump,
          duration: 0.25,
          ease: "power2.out",
        });
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const resetLine = () => {
      points.current.forEach((point) => {
        gsap.killTweensOf(point);
        gsap.to(point, {
          y: baseY.current,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      if (quoteRef.current && roleRef.current) {
        gsap.to([quoteRef.current, roleRef.current], {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        quoteRef.current.textContent = mockQuotes[1]?.text || "";
        roleRef.current.textContent = mockRoles[1]?.title || "";
      }

      setIndex(1);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      triggerSmoothOval(x, y);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", resetLine);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", resetLine);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [index]);

  return (
    <div className="w-full h-[60vh] mt-20 relative overflow-hidden">
      {/* Image */}
      <img
        ref={imageRef}
        src={mockImages[index].src}
        alt={mockImages[index].label}
        className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none border-2 border-[#999999] object-contain w-[40vw] max-w-[180px] sm:max-w-[200px]"
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full block z-0"
      />

      {/* Quote */}
      <p
        ref={quoteRef}
        className="absolute left-4 sm:left-6 top-[40%] text-sm sm:text-base text-white font-medium pointer-events-none max-w-[60%] sm:max-w-[50%]"
      >
        {mockQuotes[1]?.text}
      </p>

      {/* Role */}
      <p
        ref={roleRef}
        className="absolute right-4 sm:right-6 top-[52%] text-sm sm:text-base text-white font-medium pointer-events-none max-w-[40%]"
      >
        {mockRoles[1]?.title}
      </p>
    </div>
  );
};

export default WaveLine;
