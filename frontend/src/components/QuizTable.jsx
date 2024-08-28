import React from 'react';
import { Clipboard, ToggleLeft, ToggleRight } from 'lucide-react';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

export function QuizTable({ quizzes, handleViewLeaderboard, handleCopyToClipboard, saveScoresStates, handleSaveScoresToggle }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Save Scores</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {quizzes.map((quiz) => (
                        <tr key={quiz._id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quiz.title}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.description}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                    onClick={() => handleSaveScoresToggle(quiz._id)}
                                    className="focus:outline-none"
                                >
                                    {saveScoresStates[quiz._id] ? (
                                        <ToggleRight className="w-10 h-6 text-blue-600" />
                                    ) : (
                                        <ToggleLeft className="w-10 h-6 text-gray-400" />
                                    )}
                                </button>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleCopyToClipboard(quiz._id)}
                                        className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                                    >
                                        <Clipboard className="w-4 h-4 mr-1" />
                                        Copy Link
                                    </button>
                                    <button 
                                        className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                                        onClick={() => handleViewLeaderboard(quiz._id)}
                                    >
                                        <LeaderboardIcon className="w-4 h-4 mr-1" />
                                        View Leaderboard
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
// import React from 'react';
// import { Clipboard } from 'lucide-react';
// import LeaderboardIcon from '@mui/icons-material/Leaderboard';


// function QuizTable({ quizzes, handleViewLeaderboard, handleCopyToClipboard, setMyLink }) {
//     return (
//         <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Link to take</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leaderboard</th>
//                     </tr>

//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                     {quizzes.map((quiz) => (
//                         <tr key={quiz._id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
//                             </td>
//                             <td className="px-6 py-4">
//                                 <div className="text-sm text-gray-500">{quiz.description}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <button
//                                     onClick={() => {
//                                         setMyLink(`https://www.quizai.tech/play?quizId=${quiz._id}`);
//                                         handleCopyToClipboard();
//                                     }}
//                                     className="text-blue-600 hover:text-blue-900 mr-4"
//                                 >
//                                     <Clipboard className="w-4 h-4 inline-block mr-1" />
//                                     Copy Link
//                                 </button>
//                             </td>
//                             <td>
//                             <button 
//                                     onClick={() => handleViewLeaderboard(quiz._id)}
//                                     className="text-blue-600 hover:text-blue-900"
//                                 >
//                                     <LeaderboardIcon className="w-4 h-4 inline-block mr-1" />
//                                     View Leaderboard
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default QuizTable;