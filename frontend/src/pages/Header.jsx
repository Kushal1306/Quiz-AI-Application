import React from 'react'
import Home from './Home'
import Pricing from './Pricing'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate=useNavigate();
    const scrollToscreen=(id)=>{
        const element=document.getElementById(id);
        if(element){
            element.scrollIntoView({behavior:'smooth'});
        }
    };
    const handleLogin=()=>{
        console.log("iii");
        navigate('/signin');
    }
  return (
    <div className="mt-4 flex justify-center">
    <header className=" fixed rounded-full bg-black px-5 py-2 shadow-lg sm:px-6 sm:py-3 md:px-9 md:py-4">
      <nav>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button onClick={()=>scrollToscreen('landing')} className="rounded-full px-3 py-1 text-sm font-semibold text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Home</button>
          <button onClick={()=>scrollToscreen('pricing')} className="rounded-full px-3 py-1 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Pricing</button>
          <button className="rounded-full px-3 py-1 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">About</button>
          <button onClick={handleLogin} className="rounded-full px-3 py-1 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Login</button>
        </div>
      </nav>
    </header>
  </div>
  
  )
}

export default Header