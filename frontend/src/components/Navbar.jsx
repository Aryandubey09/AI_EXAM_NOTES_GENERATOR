import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import logo from '../assets/logo.png'   // ⚠️ apne logo ka correct path likho
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {

  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits
  const [showCredits, setShowCredits] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
   
       try {
        await axios.post(serverUrl +"/api/auth/logout",{},{withCredentials:true})
        dispatch(setUserData(null))
        navigate("/auth")
       
        
       } catch (error) {
        console.error("Logout failed:", error)
       }
  }
     
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1 }}
      className='relative z-20 mx-6 mt-6
      rounded-2xl
      bg-gradient-to-br from-black/90 via-black/80 to-black/90
      backdrop-blur-2xl
      border border-white/10
      shadow-[0_23px_45px_rgba(0,0,0,0.46)]
      flex items-center justify-between px-8 py-4'
    >
      <div className='flex items-center gap-3'>
        <img src={logo} alt="exam" className='w-9 h-9' />
        <span className='text-lg hidden md:block font-semibold text-white' >ExamNotes<span className='text-gray-400' >  AI</span></span>
      </div>

      <div className='flex items-center gap-6 relative' >
        <div className='relative'>
          <motion.div
          onClick={()=>{setShowCredits(!showCredits); setShowProfile(false);}}
          whileHover={
            {scale:1.07}
          }
          whileTap={{scale:0.98}}
            className='flex items-center gap-2
          px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer'>
            <span className='text-xl'>💎</span>
            <span>{credits}</span>
            <motion.span
            whileHover={{scale:1.2}}
            whileTap={{scale:0.92}}
            className='ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-white text-xs font-bold'
            >
                  ➕
            </motion.span>


          </motion.div>
          
           {showCredits && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="absolute right-0 mt-4 w-72 rounded-2xl 
                 bg-black text-gray-800
                 shadow-2xl border border-gray-200
                 p-5 z-50"
    >
      <h4 className="font-semibold text-lg mb-2 text-white">
        Buy Credits
      </h4>

      <p className="text-sm text-white mb-4 leading-relaxed">
        Use credits to generate AI notes, diagrams and PDFs instantly.
      </p>

      <button
        onClick={() => {
          setShowCredits(false);
          navigate("/pricing");
        }}
        className="w-full py-2.5 rounded-xl 
                   bg-gradient-to-r from-indigo-600 to-blue-600 
                   text-white font-semibold 
                   hover:opacity-90 transition-all duration-200"
      >
        Buy More Credits
      </button>
    </motion.div>
  </AnimatePresence>
)}
          
             </div>
                  
<div className='relative'>
          <motion.div
          onClick={()=>{setShowProfile(!showProfile);setShowCredits(false)}}
          whileHover={
            {scale:1.07}
          }
          whileTap={{scale:0.98}}
            className='flex items-center gap-2
          px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer'>
            <span className='text-lg'>{userData?.name.slice(0,1).toUpperCase()}</span>
 </motion.div>
         
         {
            showProfile && 
            <AnimatePresence>
              <motion.div 
              initial={{ opacity: 0, y: -10 , scale:0.95}}
              animate={{ opacity: 1, y: 0,scale:1 }}
              exit={{ opacity: 0, y: -10,scale:0.95 }}
              transition={{ duration: 0.3 }}
              className='absolute cursor-pointer right-0 mt-4 w-52 rounded-2xl bg-black/90 backdrop-blur-xl border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.77)] p-4 text-white'
              >
                <MenuItem text="History" onClick={()=>{setShowProfile(false); navigate("/history")}} />
                <div className='h-px bg-white/20 mx-3' />
                <MenuItem text="Logout" red onClick={handleLogout} />
               
              
              </motion.div>
            </AnimatePresence>}


        </div>

      </div>
    </motion.div>
  )
}

function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`w-full text-left cursor-pointer rounded-2xl px-5 py-3 text-sm transition-colors ${
        red
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-200 hover:bg-white/10"
      }`}
    >
      {text}
    </div>
  );
}

export default Navbar
