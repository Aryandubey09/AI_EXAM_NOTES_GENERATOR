import { signInWithPopup } from 'firebase/auth';
import {  motion } from 'motion/react'
import React from 'react'
import { auth, provider } from '../utils/firebase';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';


function Auth() {
   const dispatch = useDispatch()
const handleGoogleAuth = async () => {
 try {
    const response = await signInWithPopup(auth, provider);
    const User = response.user;
    const name = User.displayName;
    const email = User.email;
 
    
    const result =await axios.post(serverUrl +"/api/auth/google", {name,email},{
        withCredentials:true
    })
    dispatch(setUserData(result.data))

   
 } catch (error) {
    console.error("Error during Google authentication:", error);
    
 }
};

    return (
        <div className='min-h-screen overflow-hidden bg-white text-black px-8' >
            <motion.header
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.2 }}
                className='max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blur-l border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.2)]' >

                <h1 className='text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent' >Welcome to Exam Notes AI</h1>
                <p className='text-l  text-gray-300 mt-1' >AI powered exam-oriented  </p>
            </motion.header>

            <main className='max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ' >
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.1 }}>
                    <h1 className='text-3xl font-bold lg:text-6xl leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent ' >Unlock Smart <br />AI Notes</h1>
                    <motion.button
                        onClick={handleGoogleAuth}
                        whileHover={{
                            y: -9,
                            rotateX: 6,
                            rotateY: -6,
                            scale: 1,
                        }}
                        whileTap={{ scale: 0.91 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className='mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]' >
                        <FcGoogle size={22} />
                        Sign in with Google
                    </motion.button>

                    <p className='mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent' >

                        you get <span className='font-semibold'>50 FREE credits</span>to create exam notes,project notes, charts,graphs and download clean PDFs -instantly using AI.
                    </p>
                    <p className='mt-4 text-sm text-gray-500' >Start with 50 credit Upgrade anytime for more credits </p>

                </motion.div>
                { /* right content */}
                <div  className='grid grid-cols-1 sm:grid-cols-2 gap-8' >
                    <Features icon ="🎁 "title ="50 Free Credits" des="Start with 50 credits to generate notes without paying "/>
                    <Features icon ="⚡" title ="Instant Generation" des="Get your notes instantly with the power of AI "/>
                    <Features icon ="📚" title ="Exam Notes" des="Generate exam notes, project notes, charts, and graphs with ease."/>
                    <Features icon ="💾" title ="Downloadable PDFs" des="Download your generated notes as clean PDFs for offline access."/>
                    <Features icon ="📊" title ="Charts & Graphs" des="Generate and download charts and graphs for better understanding. "/>


                </div>
            </main>
        </div>
    )
}
function Features({ icon, title, des }) {
    return (
        <motion.div
            whileHover={{
                y: -6,
                rotateX: 5,
                rotateY: -5,
                scale: 1,
            }}

            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className='relative rounded-2xl p-6 bg-gradient-to-br
            from-black/80 to-black/60 border border-white/10
            shadow-[0_15px_30px_rgba(0,0,0,0.4)]
            text-white backdrop-blur-l'
                style={{transformStyle:"preserve-3d"}}
                >
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity pointer-events-none' />
                            <div className='relative z-10' style={{transform:"translateZ(30px)"}} >
                                <div className="text-4xl mb-3" >{icon}</div>
                                <h3 className='text-lg font-semibold mb-2' >{title}</h3>
                                <p className='text-gray-300 text-sm leading-relaxed' >{des}</p>

                                </div>

                        
           


        </motion.div>
    )
}

export default Auth
