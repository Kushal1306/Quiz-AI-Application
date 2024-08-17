import React,{useState} from 'react';
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {GoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import toast from 'react-hot-toast';


function Signin() {
    const navigate=useNavigate();
    const [userName,setuserName]=useState("");
    const [password,setPassword]=useState("");

    const handleButton=async()=>{
      if(!(userName && password)){
        toast.error('Insufficient Details')
        return;

      }
        try {
            const response=await axios.post("https://quiz-ai-backend.vercel.app/user/signin",{
                userName,
                password
            });
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard");
            
        } catch (error) {
            console.log(error); 
        }

    };

    const handleGoogleSignIn=async(credentialResponse)=>{
        try {
            const decoded=jwtDecode(credentialResponse.credential);
            console.log(decoded);
            const response=await axios.post("https://quiz-ai-backend.vercel.app/user/google-signin",{
                token:credentialResponse.credential,
            });
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard"); 
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }

    };

  return (
<div className="bg-slate-100 h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
  <div className="flex flex-col justify-center max-w-md w-full">
    <div className="rounded-lg bg-white shadow-lg w-full text-center py-4 sm:py-6 px-6 sm:px-8">
      <Heading label={"Sign in"} />
      <SubHeading label={"Enter your credentials to access your account"} />
      <div className="mt-2">
        <InputBox
        id="email"
          type="email"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          placeholder="name@gmail.com"
          label={"Email"}
        />
      </div>
      <div className="mt-2">
        <InputBox
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          label={"Password"}
        />
      </div>
      <div className="mt-4">
        <Button label={"Sign in"} onClick={handleButton} />
      </div>
      <div>
      <SubHeading label={"or continue with"} />
      </div>
      <div className="pt-2 w-full flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSignIn}
          onError={() => console.log('Login failed')}
          className="w-full max-w-xs"
        />
      </div>
      <div className="pt-4">
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  </div>
</div>    
  )
}

export default Signin;

 // <div className="bg-slate-300 h-screen flex justify-center">
    //   <div className="flex flex-col justify-center">
    //     <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    //       <Heading label={"Sign in"} />
    //       <SubHeading label={"Enter your credentials to access your account"} />
    //       <InputBox
    //         type="email"
    //         value={userName}
    //         onChange={(e) => {
    //           setuserName(e.target.value);
    //         }} placeholder="name@gmail.com" label={"Email"} />
    //       <InputBox
    //         type="password"
    //         value={password}
    //         onChange={(e) => {
    //           setPassword(e.target.value);
    //         }}
    //         placeholder="123456" label={"Password"} />
    //       <div className="pt-4">
    //         <Button label={"Sign in"} onClick={handleButton} />
    //       </div>
    //       <div className='pt-4 w-full px-10 pb-2'>
    //         <div className="w-full justify-center">
    //           <GoogleLogin
    //             onSuccess={handleGoogleSignIn}
    //             onError={() => console.log('login failed')}
    //           />
    //         </div>
    //       </div>
    //       <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
    //     </div>
    //   </div>
    // </div>