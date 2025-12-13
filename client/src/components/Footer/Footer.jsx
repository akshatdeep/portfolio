import React, { useState, useEffect } from "react";
import AnimatedText from "../Animations/AnimatedText";
import { useMouse } from "../../context/MouseContext"; 

const Footer = () => {
  const [dateTime, setDateTime] = useState({ year: "", time: "" });
  const { enlargeDot, shrinkDot } = useMouse(); 

  const getISTTime = () => {
    const now = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    const timeString = now.toLocaleTimeString("en-IN", options);
    const year = now.toLocaleString("en-IN", {
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
    return { year, time: timeString };
  };

  useEffect(() => {
    setDateTime(getISTTime());
    const interval = setInterval(() => {
      setDateTime(getISTTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-[10vh] mt-[5rem] w-screen flex flex-col md:flex-row bg-[#0F151A] text-white font-["General Sans"] font-medium'>
     
      <div className="footer-left h-full w-full md:w-1/2 flex items-center gap-4 px-[2vw] justify-center md:justify-start">
        <h3>{dateTime.year} &copy;</h3>
        <h3 className="uppercase">{dateTime.time} IST</h3>
      </div>

     
      <div className="footer-right h-full w-full md:w-1/2 flex justify-evenly items-center uppercase mt-2 md:mt-0">
        <a
          href="https://github.com/akshatdeep"
          className="hover:text-gray-400 transition"
          onMouseEnter={() => enlargeDot("")}
          onMouseLeave={shrinkDot}
        >
          <AnimatedText>GitHub</AnimatedText>
        </a>
        <a
          href="https://www.linkedin.com/in/akshat-deep-astik-6220b6295/"
          className="hover:text-gray-400 transition"
          onMouseEnter={() => enlargeDot("")}
          onMouseLeave={shrinkDot}
        >
          <AnimatedText>LinkedIn</AnimatedText>
        </a>
        <a
          href="#"
          className="hover:text-gray-400 transition"
          onMouseEnter={() => enlargeDot("")}
          onMouseLeave={shrinkDot}
        >
          <AnimatedText>Instagram</AnimatedText>
        </a>
      </div>
    </div>
  );
};

export default Footer;
