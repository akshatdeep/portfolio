import React from 'react';

const About = () => {
  return (
    <div className='h-screen w-screen bg-black flex text-white font-["General Sans"] lg:flex-row flex-col'>
      {/* Image Section */}
      <div className='lg:h-full lg:w-1/2 h-1/2 w-full flex justify-center items-center'>
        <img
          className='h-[50%] md:h-[80%] object-cover object-center w-[50%] md:w-[55%] lg:h-1/2 lg:w-1/2 rounded-full ml-0 lg:ml-[10vw]'
          src="https://avatars.githubusercontent.com/u/132156274?s=400&u=7e29197823619d94b1256037b10fd0a749548379&v=4"
          alt="Profile"
        />
      </div>
      
      {/* Text Section */}
      <div className='h-1/2 lg:h-full lg:w-1/2 w-full flex flex-col justify-center items-start text-lg px-4 lg:px-0 md:text-xl'>
        <p className='text-stone-500'>(About Me)</p>
        <h3 className='lg:w-[80%] text-justify'>
          I’m a self-taught programmer with a deep passion for learning. I’m excited to contribute to a dynamic team environment, ready to tackle challenges, and eager to grow together. Whether working on freelance projects or within a team, I bring enthusiasm and dedication to every opportunity.
        </h3>
        <button className='px-6 text-white rounded-3xl text-base md:text-lg mt-3 py-1 border border-white transition ease-in-out hover:bg-white hover:text-black'>
          Let's Talk
        </button>
      </div>
    </div>
  );
};

export default About;
