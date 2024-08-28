import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Clipboard, Grid, List, ToggleLeft, ToggleRight } from 'lucide-react';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Leaderboard from './Leaderboard';
import toast from 'react-hot-toast';
import {QuizTable} from '../components/QuizTable';

function MyQuizzes() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [showMyQuizzes, setShowMyQuizzes] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [saveScoresStates, setSaveScoresStates] = useState({});

    const handleCreateQuiz = () => {
        navigate("/create");
    };

    const handleViewLeaderboard = (quizId) => {
        setSelectedQuizId(quizId);
        setShowLeaderboard(true);
        setShowMyQuizzes(false);
    };

    const handleBackToQuizzes = () => {
        setShowLeaderboard(false);
        setShowMyQuizzes(true);
        setSelectedQuizId(null);
    };

    const handleCopyToClipboard = async (quizId) => {
        const saveScores = saveScoresStates[quizId] || false;
        const link = `https://www.quizai.tech/play?quizId=${quizId}${saveScores ? '&saveScores=true' : ''}`;
        try {
            await navigator.clipboard.writeText(link);
            toast.success('Link copied to clipboard!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to copy link');
        }
    };

    const handleSaveScoresToggle = (quizId) => {
        setSaveScoresStates(prevState => ({
            ...prevState,
            [quizId]: !prevState[quizId]
        }));
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("https://quiz-ai-backend.vercel.app/quiz/all", {
                    params: {
                        title: searchText
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuizzes(response.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                toast.error("Failed to fetch quizzes");
            }
        };
        fetchQuizzes();
    }, [searchText]);

    const CustomToggle = ({ checked, onChange }) => (
        <button
            onClick={onChange}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                checked ? 'bg-blue-600' : 'bg-gray-200'
            }`}
        >
            <span
                className={`${
                    checked ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
            {checked ? (
                <ToggleRight className="absolute right-1 w-4 h-4 text-white" />
            ) : (
                <ToggleLeft className="absolute left-1 w-4 h-4 text-gray-400" />
            )}
        </button>
    );

    const renderQuizCard = (quiz) => (
        <div key={quiz._id} className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{quiz.title}</h3>
                <p className="text-gray-600">{quiz.description}</p>
            </div>
            <div className="bg-gray-50 p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Save Scores</span>
                    <CustomToggle
                        checked={saveScoresStates[quiz._id] || false}
                        onChange={() => handleSaveScoresToggle(quiz._id)}
                    />
                </div>
                <div className="flex items-center justify-between gap-2">
                    <button
                        onClick={() => handleCopyToClipboard(quiz._id)}
                        className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        <Clipboard className="w-4 h-4 mr-2" />
                        Copy Link
                    </button>
                    <button 
                        className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={() => handleViewLeaderboard(quiz._id)}
                    >
                        <LeaderboardIcon className="w-4 h-4 mr-2" />
                        Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow pt-4 sm:pt-6">
                <div className="container mx-auto px-4 py-2">
                    {showLeaderboard && (
                        <button 
                            onClick={handleBackToQuizzes}
                            className="mb-2 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                            <ArrowBackIcon className="mr-2" />
                            Back to Quizzes
                        </button>
                    )}
                    {showMyQuizzes && (
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="relative w-full sm:w-auto">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type='text' 
                                    placeholder='Search quizzes' 
                                    className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                                    onChange={(e) => setSearchText(e.target.value)}
                                    value={searchText}
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={handleCreateQuiz}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Create Quiz
                                </button>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleViewModeChange('grid')}
                                        className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                                    >
                                        <Grid size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleViewModeChange('table')}
                                        className={`p-2 rounded-full ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                                    >
                                        <List size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showMyQuizzes && quizzes.length > 0 && (
                        viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {quizzes.map(renderQuizCard)}
                            </div>
                        ) : (
                            <QuizTable 
                                quizzes={quizzes} 
                                handleViewLeaderboard={handleViewLeaderboard}
                                handleCopyToClipboard={handleCopyToClipboard}
                                saveScoresStates={saveScoresStates}
                                handleSaveScoresToggle={handleSaveScoresToggle}
                            />
                        )
                    )}
                    {showLeaderboard && selectedQuizId && (
                        <div className='justify-center items-center'>
                            <Leaderboard quizId={selectedQuizId} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default MyQuizzes;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AppHeader from './AppHeader';
// import LeaderboardIcon from '@mui/icons-material/Leaderboard';
// import SearchIcon from '@mui/icons-material/Search';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useNavigate } from 'react-router-dom';
// import Leaderboard from './Leaderboard';
// import { Clipboard, Grid, List } from 'lucide-react';
// import QuizTable from '../components/QuizTable';
// import toast from 'react-hot-toast';


// function MyQuizzes() {
//     const [searchText, setSearchText] = useState("");
//     const navigate = useNavigate();
//     const [quizzes, setQuizzes] = useState([]);
//     const [showLeaderboard, setShowLeaderboard] = useState(false);
//     const [selectedQuizId, setSelectedQuizId] = useState(null);
//     const [showMyQuizzes, setShowMyQuizzes] = useState(true);
//     const [myLink,setMyLink]=useState("");
//     const [viewMode, setViewMode] = useState('grid'); // New state for view mode


//     const handleCreateQuiz = () => {
//         navigate("/create");
//         console.log("Creating a new quiz");
//     };

//     const handleViewLeaderboard = (quizId) => {
//         setSelectedQuizId(quizId);
//         setShowLeaderboard(true);
//         setShowMyQuizzes(false);
//     };

//     const handleBackToQuizzes = () => {
//         setShowLeaderboard(false);
//         setShowMyQuizzes(true);
//         setSelectedQuizId(null);
//     };

//     const handleCopyToClipboard=async()=>{
//         try {
//             await navigator.clipboard.writeText(myLink);
//             toast.success('Link copied to clipboard!');
//         } catch (error) {
//             console.log(error);
//         }

//     };

//     const handleViewModeChange = (mode) => {
//         setViewMode(mode);
//     };

//     useEffect(() => {
//         const fetchQuizzes = async () => {
//             const token = localStorage.getItem("token");
//             try {
//                 console.log(searchText);
//                 const response = await axios.get("https://quiz-ai-backend.vercel.app/quiz/all", {
//                     params: {
//                         title: searchText
//                     },
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 setQuizzes(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error("Error fetching quizzes:", error);
//             }
//         };
//         fetchQuizzes();
//     }, [searchText]);

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-50">
//             <main className="flex-grow pt-4 sm:pt-6">
//                 <div className="container mx-auto px-4 py-2">
//                     {showLeaderboard && (
//                         <button 
//                             onClick={handleBackToQuizzes}
//                             className="mb-2 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
//                         >
//                             <ArrowBackIcon className="mr-2" />
//                             Back to Quizzes
//                         </button>
//                     )}
//                     {showMyQuizzes && (
//                         <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
//                             <div className="relative w-full sm:w-auto">
//                                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                 <input 
//                                     type='text' 
//                                     placeholder='Search quizzes' 
//                                     className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
//                                     onChange={(e) => setSearchText(e.target.value)}
//                                     value={searchText}
//                                 />
//                             </div>
//                             <div className="flex items-center space-x-4">
//                                 <button 
//                                     onClick={handleCreateQuiz}
//                                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                                 >
//                                     Create Quiz
//                                 </button>
//                                 <div className="flex space-x-2">
//                                     <button
//                                         onClick={() => handleViewModeChange('grid')}
//                                         className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                                     >
//                                         <Grid size={20} />
//                                     </button>
//                                     <button
//                                         onClick={() => handleViewModeChange('table')}
//                                         className={`p-2 rounded-full ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                                     >
//                                         <List size={20} />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {showMyQuizzes && quizzes.length > 0 && (
//                         viewMode === 'grid' ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {quizzes.map((quiz) => (
//                                     <div key={quiz._id} className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
//                                         <div className="p-6 flex-grow">
//                                             <h3 className="text-xl font-bold mb-2 text-gray-800">{quiz.title}</h3>
//                                             <p className="text-gray-600">{quiz.description}</p>
//                                         </div>
//                                         <div className="bg-gray-50 p-4 flex items-center justify-between gap-1">
//                                             <button
//                                                 onClick={() => {
//                                                     setMyLink(`https://www.quizai.tech/play?quizId=${quiz._id}`);
//                                                     handleCopyToClipboard();
//                                                 }}
//                                                 className="flex items-center px-3 py-1 md:px-5 md:py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
//                                             >
//                                                 <Clipboard className="w-4 h-4 mr-1" />
//                                                 Copy Link
//                                             </button>
//                                             <button 
//                                                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-sm px-3 py-1 md:px-5 md:py-2 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//                                                 onClick={() => handleViewLeaderboard(quiz._id)}
//                                             >
//                                                 <LeaderboardIcon className="text-2xl text-white px-1 h-4" />
//                                                 View Leaderboard
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <QuizTable 
//                                 quizzes={quizzes} 
//                                 handleViewLeaderboard={handleViewLeaderboard}
//                                 handleCopyToClipboard={handleCopyToClipboard}
//                                 setMyLink={setMyLink}
//                             />
//                         )
//                     )}
//                     {showLeaderboard && selectedQuizId && (
//                         <div className='justify-center items-center'>
//                             <Leaderboard quizId={selectedQuizId} />
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };
// export default MyQuizzes;
