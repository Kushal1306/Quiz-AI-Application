import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
    const response=await axios.post("https://quiz-ai-backend.vercel.app/user/launch",{email});
    console.log("email submitted:",email);
    if(response)
    navigate('/thanks');
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 font-sans text-black">
  <div className="w-full max-w-4xl text-center">
    <main>
      <h1 className="mb-7 text-6xl font-bold leading-tight md:text-8xl">Quiz AI</h1>
      <p className="text-xl mx-auto mb-4 max-w-2xl font-medium sm:mx-auto sm:text-xl md:text-2xl md:font-semibold">Generate and share engaging quizzes effortlessly with AI in one click.</p>
      <p className="text-l mx-auto mb-8 max-w-2xl font-medium sm:mx:auto sm:text-xl md:text-2xl md:font-semibold">Perfect for educators, content creators, and students.</p>
      {/* <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col items-center justify-center gap-4 sm:flex-row">
        <input type="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Enter your Email" className="w-7/12 rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black sm:w-auto sm:px-4 sm:py-3 sm:text-base" required />
        <button type="submit" className="w-7/12 rounded-full bg-black px-4 py-3 font-semibold text-white transition duration-300 hover:bg-gray-800 sm:w-auto sm:px-6 sm:py-3 sm:text-lg">Get Notified</button>
      </form>
      <p className="mt-4 text-sm text-gray-600 sm:text-sm">Be the first to know when we launch.</p> */}
      <h1 className="mt-4 text-xl text-gray-600">Login to test it.</h1>

    </main>
  </div>
</div>

    </>
  )
}

export default LandingPage