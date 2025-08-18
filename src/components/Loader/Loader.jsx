import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = [
    { lang: "English", text: "Hi" },
    { lang: "Hindi", text: "नमस्ते" },
    { lang: "French", text: "Bonjour" },
    { lang: "Japanese", text: "こんにちは" },
];

const Loader = ({ onComplete }) => {
    const loaderRef = useRef(null);
    const textRef = useRef(null);
    const curtainRef = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const showGreetings = async () => {
            const tl = gsap.timeline();

            // Curtain In
            tl.fromTo(
                curtainRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    transformOrigin: "left center",
                    duration: 1,
                    ease: "power4.inOut",
                }
            );

            await delay(1200); // wait for curtain

            // Loop greetings one by one manually
            for (let i = 0; i < greetings.length; i++) {
                gsap.to(textRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => setIndex(i),
                });

                await delay(250); // wait for state update and fade out
                gsap.to(textRef.current, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power3.out",
                });

                await delay(1000); // keep greeting visible
            }

            // Hide text
            gsap.to(textRef.current, {
                opacity: 0,
                duration: 0.3,
            });

            await delay(300);

            // Curtain Out
            gsap.to(curtainRef.current, {
                scaleX: 0,
                transformOrigin: "right center",
                duration: 0.8,
                ease: "power4.inOut",
            });

            await delay(900);

            // Slide loader up
            gsap.to(loaderRef.current, {
                y: "-100%",
                duration: 1,
                ease: "power3.inOut",
                onComplete: () => onComplete && onComplete(),
            });
        };

        showGreetings();
    }, [onComplete]);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[99999] bg-black text-white flex justify-center items-center overflow-hidden"
        >
            {/* Curtain */}
            <div
                ref={curtainRef}
                className="absolute inset-0 bg-black origin-left z-0"
                style={{ transform: "scaleX(0)" }}
            />

            {/* Greeting Text */}
            <h1
                ref={textRef}
                className="relative z-10 text-4xl md:text-6xl font-bold font-['General Sans'] tracking-wide transition-all duration-300"
            >
                {greetings[index].text}
            </h1>
        </div>
    );
};

export default Loader;
