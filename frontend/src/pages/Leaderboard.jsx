import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Trophy,Medal } from 'lucide-react';
import axios from 'axios';

function Leaderboard({quizId}) {
    // const [searchParams]=useSearchParams();
    // const quizId=searchParams.get("quizId");
    const [scores,setScores]=useState([]);
    useEffect(()=>{
        const token=localStorage.getItem("token");
        const fetchScores=async()=>{
            try {
                const response=await axios.get(`https://quiz-ai-backend.vercel.app/score/leaderboard/${quizId}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                console.log(response.data.leaderboard);
                setScores(response.data.leaderboard);
                
            } catch (error) {
                alert("error occured");
                console.log(error);
            }

        };
        fetchScores();

    },[]);

  return (
    <div className="container mx-auto px-4 py-8  min-h-screen">
    <h1 className="text-4xl font-bold text-center mb-8 text-black">Leaderboard</h1>
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr 
                key={score.userId} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150 ease-in-out`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {index + 1 <= 3 ? (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                      {index + 1 === 1 && <Trophy size={20} />}
                      {index + 1 === 2 && <Medal size={20} />}
                      {index + 1 === 3 && <Medal size={20} />}
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{score.userId.firstName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-black">{score.score}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Leaderboard