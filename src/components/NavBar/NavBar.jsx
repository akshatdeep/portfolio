
import React, { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { Link } from 'react-router-dom';
const NavBar = () => {


  const navelem = useRef()
  const navelem2 = useRef()

  useGSAP(()=>{
    gsap.to(navelem.current, {
      y:0,
      duration:0.5
    })

    gsap.to(navelem2.current, {
      y:0,
      duration:0.5
    })
  })




  return (
    <div className='w-screen font-["General Sans"] py-[2vw] lg:px-[2vw] flex items-center justify-between px-[4vw]'>
        <div className='logo uppercase '>
          <div className="animetionemem w-fit  overflow-hidden">
          <Link to='/'><h1 ref={navelem} className='text-xl font-semibold translate-y-[100%] '>Akshat Deep Astik</h1></Link>
          </div>
        </div>
        <div className='menu'>
        <div className=" w-fit overflow-hidden">
        <h3 ref={navelem2} className='uppercase font-semibold translate-y-[100%]'>menu <span ref={navelem2} className='font-normal text-gray-400'><i class="ri-add-fill"></i></span></h3>
        </div>
        </div>

    </div>
  )
}

export default NavBar