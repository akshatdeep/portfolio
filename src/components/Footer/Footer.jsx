import React from "react";

const Footer = () => {
  return (
    <div className='h-[10vh] mt-[5rem] w-screen flex flex-col md:flex-row bg-black text-white font-["General Sans"] font-medium'>
      {/* Footer Left Section */}
      <div className="footer-left h-full w-full md:w-1/2 flex items-center gap-4 px-[2vw] justify-center md:justify-start">
        <h3>2024 &copy;</h3>
        <h3>09:09 AM EST</h3>
      </div>

      {/* Footer Right Section */}
      <div className="footer-right h-full w-full md:w-1/2 flex justify-evenly items-center uppercase mt-2 md:mt-0">
        <a
          href="https://github.com/akshatdeep"
          className="hover:text-gray-400 transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/akshat-deep-astik-6220b6295/"
          className="hover:text-gray-400 transition"
        >
          LinkedIn
        </a>
        <a href="#" className="hover:text-gray-400 transition">
          Instagram
        </a>
      </div>
    </div>
  );
};

export default Footer;
