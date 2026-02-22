import React from 'react'

function Sidebar({ result }) {

if(!result || !result.subTopics || !result.questions || !result.questions.short || !result.questions.long
) {
return null
}

  return (
    <div  className='bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6' >
      <div className='flex items-center gap-2'   >
        <span  className='text-xl' >📌 </span>
        <h3 className='text-lg font-semibold text-indigo-600' 
        >Quick Exam View   
        </h3>
      </div>

      <section>
        <p  className='text-sm text-gray-700 mb-3' >
         ⭐ Sub Topic (Priority Wise) </p>
         {
          Object.entries(result.subTopics).map(([star, topics]) => (
  <div
    key={star}
    className='mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3'
  >
    <p className='text-sm font-semibold text-yellow-600 mb-1'>
      {star} Priority
    </p>

    <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
      {topics.map((t, i) => (

        <li key={i}>{t}</li>

      ))}
    </ul>
  </div>
))
         }
      </section>

      <section
      className='rounded-lg bg-yellow-200 p-3'
      >
        <p className='text-sm font-semibold mb-1 text-gray-700' >Extra Importance</p>
        <span className='text-yellow-700 font-bold text-sm' >
          {result.questions.diagram && (
  <li>{result.questions.diagram}</li>
)}
        </span>

       <p className='text-sm font-semibold text-gray-700 mt-2 mb-3'  >Important Question</p>
  
  <div
  className='mb-4 rounded-lg bg-indigo-50 border border-indigo-200 p-3'
  >
    <p
              className='text-sm font-semibold text-yellow-600 mb-1'
              >
                Short Questions
              </p>

              <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1' >
                {
                  result.questions.short.map((t,i)=>(
                    <li key={i}
                    
                    >{t}</li>
                  ))
                }

              </ul>
  </div>


      <div
  className='mb-4 rounded-lg bg-purple-50 border border-purple-200 p-3'
  >
    <p
              className='text-sm font-semibold text-yellow-600 mb-1'
              >
                Long Questions
              </p>

              <ul className='list-disc ml-4 text-sm text-purple-700 space-y-1' >
                {
                  result.questions.long.map((t,i)=>(
                    <li key={i}
                    
                    >{t}</li>
                  ))
                }

              </ul>
  </div>
  
   <div
  className='mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3'
  >
    <p
              className='text-sm font-semibold text-blue-600 mb-1'
              >
                Diagram Question
              </p>

              <ul className='list-disc ml-4 text-sm text-blue-700 space-y-1' >
                {
                <li>{result.questions.diagram}</li>
                }

              </ul>
  </div>

      </section>
      
    </div>
  )
}

export default Sidebar
