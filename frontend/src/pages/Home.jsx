import React from 'react'
import Navbar from '../components/Navbar'
import { Feature, motion } from 'motion/react'
import img from "../assets/img1.png"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen overflow-hidden bg-white text-black' >
      <Navbar />
      <section className='max-w-7xl  pt-32 mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ' >
        <div>
          <motion.div

            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className='transform-gpu'
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              className='text-5xl font-extrabold lg:text-6xl leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent '
              whileHover={{
                y: -4,
              }}
              style={{
                transform: "translateZ(40px)",
                TextShadow: "0 18px 40px rgba(0,0,0,0.29)"
              }}
            >
              Create Smart <br /> AI Notes in Seconds

            </motion.h1>
            <motion.p
              whileHover={{
                y: -2,
              }}
              style={{
                transform: "translateZ(30px)",
                TextShadow: "0 18px 40px rgba(0,0,0,0.29)"
              }}
              className='text-lg bg-clip-text text-transparent bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 mt-6 max-w-xl' >
              Experience the future of note-taking with our AI-powered exam notes generator. Say goodbye to tedious manual note creation and hello to smart, concise, and organized notes that will help you ace your exams effortlessly.
            </motion.p>

            <motion.button
            onClick={()=>navigate("/notes")}
              whileHover={{

                scale: 1.1,
              }}
              whileTap={{ scale: 1.1 }}
              className='mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]' >
             
            get Started
            </motion.button>

          </motion.div>
        </div>
          
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ y:-12 , rotateX: 6, rotateY: -6 , scale:1.04 }}
          className='transform-gpu'
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className='overflow-hidden' >
          <img src={img} alt="notes" style={{ transform: "translateZ(40px)" }} />
         </div>
        </motion.div>
</section>

   <section
   className='max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10'
   >
         
         <Features icon="📚" title="Exam Notes" des="Generate exam notes, project notes, charts, and graphs with ease." />
         <Features icon="⚡" title="Project Notes" des="Well Structured content for assignments and projects " />
         <Features icon="💾" title="Downloadable PDFs" des="Download your generated notes as clean PDFs for offline access." />
         <Features icon="📊" title="Charts & Graphs" des=" ,Auto Generate and download charts and graphs for better understanding. " />

   </section>
      
      <Footer/>

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

export default Home
