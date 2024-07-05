import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom';
import { Trophy } from 'lucide-react';
// import axios from 'axios';

function Leaderboard() {
    // const [searchParams]=useSearchParams();
    // const quizId=searchParams.get("quizId");
    const [scores,setScores]=useState([{
        quizId:"12434",
        userId:"12233443",
        firstName:"Kushal",
        score:50
    },{
        quizId:"12434",
        userId:"12334423",
        firstName:"Kushal",
        score:40
    },
    {
        quizId:"12434",
        userId:"12334423",
        firstName:"Kushal",
        score:30
    }]);
    // useEffect(()=>{
    //     const token=localStorage.getItem("token");
    //     const fetchScores=async()=>{
    //         try {
    //             const response=await axios.get(`http://localhost:3000/score/leaderboard/${quizId}`,{
    //                 headers:{
    //                     Authorization:`Bearer ${token}`
    //                 }
    //             });
    //             console.log(response.data.leaderboard);
    //             setScores(response.data.leaderboard);
                
    //         } catch (error) {
    //             alert("error occured");
    //             console.log(error);
    //         }

    //     };
    //     // fetchScores();

    // },[]);

  return (
    <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-center mb-6'>Leaderboard</h1>
        <div className='bg-white shadow-md rounded-lg overflow-hidden'>
            <table className='w-full'>
               <thead className='bg-gray'>
                <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Rank</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Score</th>
                </tr>
               </thead>
               <tbody className='bg-white divide-y divide-gray-200'>
                { scores.map((score,index)=>(
                    <tr key={score.userId} className={index%2===0?'bg-gray-50':'bg-white'}>
                       <td className='px-6 py-4 whitespace-nowrap'>
                         { index+1===1?(
                            <Trophy className='text-yellow-400' size={24}/>
                         ):(
                            <span className='text-sm text-gray-900'>{index+1}</span>
                         )}
                       </td>
                       <td className='px-6 py-4 whitespace-nowrap'>

                       </td>
                       <td className='px-6 py-4 whitespace-nowrap'>

                       </td>
                        

                    </tr>

                ))}

               </tbody>
            </table>

        </div>

    </div>
  )
}

export default Leaderboard