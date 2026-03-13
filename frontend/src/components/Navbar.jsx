import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {BsRobot,BsCoin} from "react-icons/bs";
import {FaUserAstronaut} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const {userData}=useSelector((state)=>state.user)
    const[showCreditPopUp,setShowCreditPopUp]=useState(false)
    const[showUserPopUp,setShowUserPopUp]=useState(false)

    const navigate=useNavigate()
  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
        <motion.div
        initial={{opactiy:0,y:-40}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.3}}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative ">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-white bg-black p-2 rounded-lg">
              <BsRobot  size={18}/>
            </div>
            <h1 className="font-semibold hidden md:block text-lg">InterViweIQ.Ai</h1>
          </div>
          <div className="flex items-center gap-6 realtive">
            <div className="realtive">
              <button onClick={()=>setShowCreditPopUp(!showCreditPopUp)} className="flex gap-2 items-center bg-gary-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 cursor-pointer transition">
                <BsCoin size={20}/>
                {userData?.credits || 0}
                {showCreditPopUp && (
                  <div className='absolute top-full right-0 mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
                    <p className="text-sm mb-4  text-gray-600">Need more Credit to Continue InterView?</p>
                    <button onClick={()=>navigate("/pricing")} className="w-full bg-black text-white py-2 rounded-lg text-sm">Buy more Credits</button>
                  </div>
                )}
              </button>
            </div>
            <div>
              <button className="w-8 h-8 flex bg-black text-white items-center justify-center rounded-full font-semibold">
                {userData? userData?.name.slice(0,1).toUpperCase():
                <FaUserAstronaut size={16}/>}
              </button>
            </div>
          </div>
        </motion.div>
      
    </div>
  )
}

export default Navbar
