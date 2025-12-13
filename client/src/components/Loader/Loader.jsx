// src/components/Loader/Loader.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styled from "styled-components";


const greetings = [
  { lang: "English", text: "Hi" },
  { lang: "Hindi", text: "नमस्ते" },
];

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const curtainRef = useRef(null);
  const bgRef = useRef(null);
  const cssLoaderRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(loaderRef.current, { y: 0 });
      gsap.set(curtainRef.current, { transformOrigin: "left center", scaleX: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 12, scale: 0.99 });
      gsap.set(bgRef.current, { opacity: 1 });
      gsap.set(cssLoaderRef.current, { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (typeof onComplete === "function") onComplete();
        },
      });

      tl.to(curtainRef.current, { scaleX: 1, duration: 0.55 }, 0);
      tl.to(bgRef.current, { opacity: 0.98, duration: 0.55 }, 0);

      greetings.forEach((g, i) => {
        tl.call(() => (textRef.current.textContent = g.text));

        tl.fromTo(
          textRef.current,
          { y: 14, opacity: 0, scale: 0.99, filter: "blur(3px)" },
          { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.42 },
          i === 0 ? "-=0.08" : "+=0"
        );

        tl.to(textRef.current, { duration: 0.55 });
        tl.to(textRef.current, { opacity: 0, duration: 0.18 }, "+=0.02");
      });

      tl.to(cssLoaderRef.current, { opacity: 0, duration: 0.22 });
      tl.to(curtainRef.current, { scaleX: 0, duration: 0.48 });

      tl.to(loaderRef.current, {
        yPercent: -110,
        duration: 0.6,
        ease: "power3.inOut",
      });

      tlRef.current = tl;
    }, loaderRef);

    return () => {
      tlRef.current?.kill();
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <Root ref={loaderRef}>
      <Bg ref={bgRef} />
      <Curtain ref={curtainRef} />

      <Center>
        <Greeting ref={textRef} />
        <StyledWrapper>
          <span className="loader" ref={cssLoaderRef} />
        </StyledWrapper>
      </Center>
    </Root>
  );
};

export default Loader;


const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  background: #0f151a;
  z-index: 0;
`;

const Curtain = styled.div`
  position: absolute;
  inset: 0;
  background: black;
  z-index: 10;
`;

const Center = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-content: center;
  align-items: center;
`;

const Greeting = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
`;

const StyledWrapper = styled.div`
  .loader {
    display: block;
    width: 84px;
    height: 84px;
    position: relative;
  }

  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    transform: translate(-50%, -100%) scale(0);
    animation: push_401 1.6s infinite linear;
  }

  .loader:after {
    animation-delay: 0.8s;
  }

  @keyframes push_401 {
    0%,
    50% {
      transform: translate(-50%, 0%) scale(1);
    }
    100% {
      transform: translate(-50%, -100%) scale(0);
    }
  }
`;
