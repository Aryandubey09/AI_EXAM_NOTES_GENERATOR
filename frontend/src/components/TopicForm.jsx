import React, { useState } from 'react'
import { motion } from 'motion/react'
import { generateNotes } from '../services/api'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/userSlice'









function TopicForm({setResult, setLoading, loading, setError}) {

    const [topic, setTopic] = useState("")
    const [classLevel, setClassLevel] = useState("")
    const [examType, setExamType] = useState("")
    const [revisionMode, setRevisionMode] = useState(false)
    const [includeDiagram, setIncludeDiagram] = useState(false)
    const [includeChart, setIncludeChart] = useState(false)
    const [progress, setProgress]= useState(0);
    const[progressText, setProgressText] =useState("");
    const dispatch =useDispatch()

 const handleSubmit =async ()=>{
    if(!topic.trim()){
        setError("please fill topic")
        return ;
    }
    setError("")
    setLoading(true)
    setResult(null)

    try {
        const result = await generateNotes({topic,classLevel,examType, revisionMode,includeChart, includeDiagram})
        setResult(result.data)
        setLoading(false)
        setClassLevel("")
        setExamType("")
        setIncludeChart("")
        setRevisionMode(false)
        setIncludeDiagram(false)
         
        if(typeof result.creditsLeft==="number"){
            dispatch(updateCredits(result.creditsLeft))
        }
         
    } catch (error) {
        console.log(error);
        
        setError("Failed to fetch notes from server");
        setLoading(false)
        
    }
 }

     useEffect(()=>{
        if(!loading){
            setProgress(0);
            setProgressText("")
            return;
        }
        let value=0;

        const interval= setInterval(()=>{
            value+=Math.random()*8
           if(value>=95){
            value =95;
            setProgressText("Almost done")
            clearInterval(interval); 
           }
           else if(value >70){
            setProgressText("Processing content..");
           }
           else{
            setProgressText("Generating notes..");
           }
            setProgress(Math.floor(value))
        }, 700)

        return ()=> clearInterval(interval)
     },[loading])


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='rounded-2xl bg-gradient-to-br from-gray-900/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 p-8  space-y-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.76)]'
        >
            <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className='w-full  p-3  rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-400'
                placeholder='Enter the topic, e.g. "Photosynthesis" or "World War II"' />

            <input
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className='w-full  p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-400'
                placeholder='Enter your class level, e.g. "10th grade" or "Undergraduate"' />

            <input
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className='w-full p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-400'
                placeholder='Enter the exam type, e.g. "JEE" or "SAT"' />

         
                       <div className='flex flex-col md:flex-row gap-6'>
                        <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
                        <Toggle label="Include Diagrams" checked={includeDiagram} onChange={() => setIncludeDiagram(!includeDiagram)} />    
                        <Toggle label="Include Charts" checked={includeChart} onChange={() => setIncludeChart(!includeChart)} />
                       </div>
                       
                       <motion.button
                       onClick={handleSubmit}
                       whileHover={ !loading ?{scale:1.01} : {}}
                         
                       whileTap={!loading ? {scale:0.95} : {}}
                       disabled={loading}
                       className={`w-full py-3 mt-4 rounded-xl font-semibold flex items-center justify-center ${loading ? "cursor-not-allowed bg-gray-300 text-gray-600 " : "cursor-pointer bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.2)]"} `}
                       >
                          {loading ? "Generating Notes..." : "Generate Notes"}

                       </motion.button>
                       {
                        loading && 
                        <div className='mt-4 space-y-2'  >
                            <div className='w-full h-2 rounded-full bg-white/10 overflow-hidden'>
                                <motion.div 
                                initial ={{width:0}}
                                animate={{width: `${progress}%`}}
                                transition={{ease:"easeOut", duration:0.6}}
                                className='h-full bg-gradient-to-br from-green-400 via-emerald-400 to-green-500'
                                >

                                </motion.div>
                            </div>
                   <div  className='flex justify-between text-xs text-gray-300' >
                            <span>{progressText}</span>
                            <span>{progress}%</span>
                   </div>
                   <p
                   className='text-xs text-gray-400 text-center'
                   >this may take up to 2-5 minute.don't close or refresh the page</p>

                        </div>
                       }
        </motion.div>

    )
}

function Toggle({ label, checked, onChange }) {
    return (
        <div
            className='flex items-center gap-4 cursor-pointer select-none'
            onClick={onChange}
        >
            <motion.div
                animate={{
                    backgroundColor: checked ? "rgb( 34,197,94,0.33)" : "rgb(255 255 255,0.15)",
                }}
                transition={{ duration: 0.25 }}
                className='w-12 h-6 rounded-full relative border border-white/20 backdrop-blur-lg' >

                    <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className='absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]'
                   style={{
                        left: checked ? "1.6rem" : "0.25rem",
                   }}
                    >
                         
                    </motion.div>


            </motion.div>
                              <span
                          className={`text-sm transition-colors ${checked ? "text-green-300" : "text-gray-300"}`}
                          >{label}

                              </span>

        </div>
    )
}

export default TopicForm
