import React, { useState } from "react";
import 'remixicon/fonts/remixicon.css';
import { Link } from "react-router-dom";
import AnimatedText from "../Animations/AnimatedText";
import NavMenuSlider from "./NavMenuSlider";
import { useMouse } from "../../context/MouseContext"; // 👈 Import context

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { enlargeDot, shrinkDot } = useMouse(); // 👈 Use context methods

  return (
    <>
      <div className='w-screen font-["General Sans"] py-[2vw] lg:px-[2vw] flex items-center justify-between px-[4vw]'>
        
        {/* Logo with mouse context */}
        <div className='logo uppercase'>
          <div
            className="animetionemem w-fit overflow-hidden cursor-pointer"
            onMouseEnter={() => enlargeDot("")}
            onMouseLeave={shrinkDot}
          >
            <Link to='/'>
              <h1 className='text-xl font-semibold'>
                <AnimatedText totalDuration={0.4} baseDuration={0.25}>
                  Akshat Deep Astik
                </AnimatedText>
              </h1>
            </Link>
          </div>
        </div>

        {/* Menu trigger with mouse context */}
        <div className='menu'>
          <div className="w-fit overflow-hidden">
            <h3
              className='uppercase font-semibold flex items-center gap-2 cursor-pointer'
              onClick={() => setMenuOpen(true)}
              onMouseEnter={() => enlargeDot("")} 
              onMouseLeave={shrinkDot} 
            >
              <AnimatedText>menu</AnimatedText>
              <span className='font-normal text-gray-400'>
                <i className="ri-add-fill"></i>
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* Menu Slider */}
      <NavMenuSlider
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        enlargeDot={enlargeDot}  // pass down context methods
        shrinkDot={shrinkDot}
      />
    </>
  );
};

export default NavBar;
