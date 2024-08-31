import React from 'react'

const Footer = () => {
  return (
    <div className='h-[10vh] w-screen flex bg-black text-white font-["General Sans"] font-medium'>
        <div className="footer-left h-full w-1/2 flex items-center gap-4 px-[2vw]">
            <h3>2024 &copy;</h3>
            <h3>09:09 AM EST</h3>
        </div>
        <div className="footer-right  h-full w-1/2 uppercase flex justify-evenly items-center ">
            <a href="">GITHUB</a>
            <a href="">LiNKEDIN</a>
            <a href="">instagram</a>
        </div>
    </div>
  )
}

export default Footer