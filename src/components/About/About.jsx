import React from 'react'

const About = () => {
  return (
    <div className='h-screen w-screen bg-black flex text-white font-["General Sans"]'>
        <div className='h-full w-1/2  flex justify-center items-center '>
            <img className='h-[40%] object-cover object-center w-[37%] rounded-full ml-[10vw]' src="https://avatars.githubusercontent.com/u/132156274?s=400&u=7e29197823619d94b1256037b10fd0a749548379&v=4" />
        </div>
        <div className='h-full w-1/2 flex flex-col justify-center items-start text-xl '>
           <p className='text-stone-500'>(About Me)</p>
           <h3 className='w-[80%] '>I’m a self-taught programmer with a deep passion for learning. I’m excited to contribute to a dynamic team environment, ready to tackle challenges, and eager to grow together. Whether working on freelance projects or within a team, I bring enthusiasm and dedication to every opportunity</h3>
           <button className='px-[15px] text-white rounded-3xl text-[18px] mt-3 py-[2px] border-[1px] transition ease-in  border-white hover:bg-white hover:text-black '>Let's Talk</button>
        </div>
    </div>
  )
}

export default About