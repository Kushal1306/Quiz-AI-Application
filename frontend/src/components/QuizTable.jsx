import React from 'react';
import { Clipboard } from 'lucide-react';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';


function QuizTable({ quizzes, handleViewLeaderboard, handleCopyToClipboard, setMyLink }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Link to take</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leaderboard</th>
                    </tr>

                </thead>
                <tbody className="divide-y divide-gray-200">
                    {quizzes.map((quiz) => (
                        <tr key={quiz._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">{quiz.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => {
                                        setMyLink(`https://www.quizai.tech/play?quizId=${quiz._id}`);
                                        handleCopyToClipboard();
                                    }}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    <Clipboard className="w-4 h-4 inline-block mr-1" />
                                    Copy Link
                                </button>
                            </td>
                            <td>
                            <button 
                                    onClick={() => handleViewLeaderboard(quiz._id)}
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    <LeaderboardIcon className="w-4 h-4 inline-block mr-1" />
                                    View Leaderboard
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuizTable;