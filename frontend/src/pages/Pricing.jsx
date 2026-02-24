import React from 'react'
import { useNavigate } from 'react-router-dom'
import {  motion } from "motion/react";
import axios from 'axios';
import { serverUrl } from '../App';


function Pricing() {
    
  const navigate = useNavigate()
  const[selectedPrice, setSelectedPrice] = React.useState(null)
  const[paying, setPaying] = React.useState(false)
  const[payingAmount, setPayingAmount] = React.useState(null)

const CREDIT_MAP = {
  100: 50,
  200: 120,
  500: 300,
};

 const handlePaying = async (amount) => {
  try {
    setPayingAmount(amount);
    setPaying(true);

    sessionStorage.setItem("pendingCredits", CREDIT_MAP[amount]);

    const result = await axios.post(
      `${serverUrl}/api/credits/order`,
      { amount },
      { withCredentials: true }
    );

    if (result.data.url) {
      window.location.href = result.data.url;
    }

  } catch (error) {
    console.log("Payment error:", error);
  } finally {
    setPaying(false);
  }
};

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8 relative' >

      <button onClick={()=>navigate("/")} className='flex items-center gap-2 text-gray-600 hover:text-black mb-6' >⬅️Back</button>
       
       <motion.div
       
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-10'

       >
        <h1 className='text-3xl font-bold' >Buy Credits</h1>
        <p className='text-gray-600 mt-1' >Choose a plan that suits your needs</p>
       </motion.div>
          <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6' >
          <PricingCard 
          title="Starter"
          price="Rs 100"
            amount={100}
          credits="50 Credits"
          description="Perfect for quick revision"
          features={["Generate AI notes",
          "Generate AI diagram & Charts",
          "Generate PDF",
          "Fast Generation"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
          />
          <PricingCard 
          title="Popular"
          price="Rs 200"
            amount={200}
          credits="120 Credits"
          description="Best Value for students"
          features={["All Starter features",
            "more credits per rs",
            "Revision mode access",
            "Priority AI response"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
          />
          <PricingCard 
          popular
          title="Pro Learner"
          price="Rs 500"
            amount={500}
          credits="300 Credits"
          description="For serious exam preparation"
          features={["maximum cart value",
            "unlimited revisions","charts & diagrams","Ideal for full syllabus"

          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
          />
        
          
         </div>
    </div>
  )
}
function PricingCard({
  title,
  price,
  features,
  popular,
  amount,
  credits,
  description,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount

}){

 const isSelected = selectedPrice === amount;
 const isPayingThisCard =paying && payingAmount===amount;

  return (
     <motion.div
     onClick={()=>setSelectedPrice(amount)}
      whileHover={{y:-4}}
      className={`relative cursor-pointer rounded-xl p-6 bg-white border transition ${isSelected ? "border-black":popular ?"border-indigo-500":"border-gray-200"}`}
     >
      {
        popular && !isSelected && <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded">Popular</span>
      }
      {
       isSelected && <span className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1 rounded">Selected</span>
      }

       <h2 className='text-lg font-semibold'>{title}</h2>
       <p className='text-sm text-gray-600' >{description}</p>

      <div className='mt-4 ' >
        <p className='text-3xl font-bold' >{price}</p>
        <p className='text-sm text-indigo-600' >{credits}</p>
      </div>

      <button
      disabled={isPayingThisCard}
        onClick={(e)=>{
          e.stopPropagation();
          onBuy(amount)
        }}
      className={`
        w-full mt-5 py-2 rounded-lg font-medium transition ${isPayingThisCard ? "bg-gray-400  cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}
        `}
      >
            {isPayingThisCard ? "Redirecting..." : "Buy Now"}
      </button>
     
     <ul  className='mt-5 space-y-2 text-sm text-gray-600 ' >
      {
        features.map((f,i)=>(
          <li key={i} className=' flex  gap-2' >
            <span className='text-green-600' >✓</span>
            {f}
          </li>
        ))
      }
     </ul>


     </motion.div>
  )
}

export default Pricing
