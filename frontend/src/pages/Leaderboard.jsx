import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import axios from 'axios';
import { Trophy, Medal } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <p className="font-bold text-lg">{data.name}</p>
        <p className="text-sm text-gray-600">Rank: {data.rank}</p>
        <p className="text-lg font-semibold text-blue-600">Score: {data.score}</p>
      </div>
    );
  }
  return null;
};

const LeaderboardChart = ({ quizId }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchScores = async () => {
      try {
        const response = await axios.get(`https://quiz-ai-backend.vercel.app/score/leaderboard/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setScores(response.data.leaderboard);
      } catch (error) {
        console.error("Error fetching scores:", error);
        alert("An error occurred while fetching the leaderboard data.");
      }
    };
    fetchScores();
  }, [quizId]);

  const chartData = scores.map((score, index) => ({
    name: score.userId.firstName,
    score: score.score,
    rank: index + 1
  }));

  const CustomizedLabel = (props) => {
    const { x, y, width, value, index } = props;
    let icon = null;
    if (index === 0) icon = <Trophy size={20} className="text-yellow-400" />;
    else if (index === 1) icon = <Medal size={20} className="text-gray-400" />;
    else if (index === 2) icon = <Medal size={20} className="text-amber-600" />;

    return (
      <g>
        <text x={x + width / 2} y={y - 10} fill="#666" textAnchor="middle" dominantBaseline="middle">
          {value}
        </text>
        {icon && <foreignObject x={x + width / 2 - 10} y={y - 40} width={20} height={20}>
          {icon}
        </foreignObject>}
      </g>
    );
  };

  const getBarColor = (index) => {
    if (index === 0) return "#FFD700";
    if (index === 1) return "#C0C0C0";
    if (index === 2) return "#CD7F32";
    return "#3B82F6";
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Leaderboard Chart</h1>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
            <YAxis tick={{ fill: '#4B5563' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="#3B82F6">
              {chartData.map((entry, index) => (
                <Bar key={`bar-${index}`} dataKey="score" fill={getBarColor(index)} />
              ))}
              <LabelList content={<CustomizedLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeaderboardChart;
// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom';
// import { Trophy,Medal } from 'lucide-react';
// import axios from 'axios';

// function Leaderboard({quizId}) {
//     // const [searchParams]=useSearchParams();
//     // const quizId=searchParams.get("quizId");
//     const [scores,setScores]=useState([]);
//     useEffect(()=>{
//         const token=localStorage.getItem("token");
//         const fetchScores=async()=>{
//             try {
//                 const response=await axios.get(`https://quiz-ai-backend.vercel.app/score/leaderboard/${quizId}`,{
//                     headers:{
//                         Authorization:`Bearer ${token}`
//                     }
//                 });
//                 console.log(response.data.leaderboard);
//                 setScores(response.data.leaderboard);
                
//             } catch (error) {
//                 alert("error occured");
//                 console.log(error);
//             }

//         };
//         fetchScores();

//     },[]);

//   return (
//     <div className="container mx-auto px-4 py-8  min-h-screen">
//     <h1 className="text-4xl font-bold text-center mb-8 text-black">Leaderboard</h1>
//     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-black">
//             <tr>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Rank</th>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {scores.map((score, index) => (
//               <tr 
//                 key={score.userId} 
//                 className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150 ease-in-out`}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {index + 1 <= 3 ? (
//                     <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
//                       {index + 1 === 1 && <Trophy size={20} />}
//                       {index + 1 === 2 && <Medal size={20} />}
//                       {index + 1 === 3 && <Medal size={20} />}
//                     </div>
//                   ) : (
//                     <span className="text-sm font-medium text-gray-900">{index + 1}</span>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{score.userId.firstName}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-semibold text-black">{score.score}</div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Leaderboard