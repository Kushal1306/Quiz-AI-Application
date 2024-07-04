import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppHeader from './AppHeader';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
// import { Button } from '../components/Button';

function MyQuizzes() {

    const [searchText,setsearchText]=useState("");
    const navigate=useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    /*
    {id:1, title:"A Quiz on India's History", description:"Indian History"},
        {id:1, title:"A Quiz on India's History", description:"Indian History"},
        {id:2, title:"A Quiz on India's History", description:"Indian History"},
        {id:3, title:"A Quiz on India's History", description:"Indian History"}
    */

    const handleCreateQuiz = () => {
        // Implement quiz creation logic here
        navigate("/create");
        console.log("Creating a new quiz");
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("https://quiz-ai-backend.vercel.app/quiz/all", {
                    params:{
                        title:searchText
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuizzes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <AppHeader />
            <main className="flex-grow pt-16 sm:pt-10"> {/* Adjust this top padding as needed */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="relative w-full sm:w-auto">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type='text' 
                                placeholder='Search quizzes' 
                                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                onChange={(e)=>searchText(e.target.value)}
                                value={searchText}

                            />
                        </div>
                        <button 
                            onClick={handleCreateQuiz}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Create Quiz
                        </button>
                    </div>
                    {quizzes.length>0 &&(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quizzes.map((quiz,index) => (
                            <div key={quiz._id} className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-gray-800">{quiz.title}</h3>
                                    <p className="text-gray-600">{quiz.description}</p>
                                </div>
                                <div className="bg-gray-50 p-4 flex items-center justify-between">
                                    <LeaderboardIcon className="text-2xl text-blue-500" />
                                    <button 
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full text-sm px-5 py-2 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                                    >
                                        View Leaderboard
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                       )}
                </div>
                
            </main>
        </div>
    );
}

export default MyQuizzes;