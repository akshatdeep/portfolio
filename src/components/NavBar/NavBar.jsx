import React from 'react';
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import AnimatedText from '../Animations/AnimatedText'; // Your slot-machine animation component

const NavBar = () => {
  return (
    <div className='w-screen font-["General Sans"] py-[2vw] lg:px-[2vw] flex items-center justify-between px-[4vw]'>
      <div className='logo uppercase'>
        <div className="animetionemem w-fit overflow-hidden">
          <Link to='/'>
            <h1 className='text-xl font-semibold'>
              <AnimatedText totalDuration={0.4} baseDuration={0.25}>
  Akshat Deep Astik
</AnimatedText>           </h1>
          </Link>
        </div>
      </div>
      <div className='menu'>
        <div className="w-fit overflow-hidden">
          <h3 className='uppercase font-semibold flex items-center gap-2'>
            <AnimatedText>menu</AnimatedText>
            <span className='font-normal text-gray-400'><i className="ri-add-fill"></i></span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
