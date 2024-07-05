import React, { useState } from "react";
import { Edit3, Save, X, ChevronDown, ChevronUp, BookOpen, ListOrdered, Send, Captions, Trash, PlusCircle,Clipboard } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function TakeaQuiz() {
    const [title, setTitle] = useState("");
    const [topic, setTopicName] = useState("");
    const [noofQuestions, setNoofQuestions] = useState(5);
    const [buttonGenerate, setButtonGenerate] = useState(true);
    const [loading, setLoading] = useState(false);
    const [quizId, setQuizId] = useState("");
    const [questions, setQuestions] = useState([]);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState({});
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);
    const [quizLink,setQuizLink]=useState("");
    const [copySuccess,setCopySuccess]=useState("");
    const navigate=useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setButtonGenerate(false);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("https://quiz-ai-backend.vercel.app/quiz/create-quiz", {
                title,
                topic
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const newQuizId = response.data.quizId;
            setQuizId(newQuizId);

            const generateQuestions = await axios.post("https://quiz-ai-backend.vercel.app/question/generate", {
                quizId: newQuizId,
                topic,
                noofQuestions
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setQuestions(generateQuestions.data);
            const myLink=`https://quiz-ai-app.vercel.app/play?quizId=${newQuizId}`
            setQuizLink(myLink);
            navigate(`/play?quizId=${newQuizId}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(quizLink);
            setCopySuccess("Copied!");
            setTimeout(() => setCopySuccess(""), 2000); // Clear the message after 2 seconds
        } catch (error) {
            console.error("Failed to copy: ", error);
            setCopySuccess("Failed to copy!");
            setTimeout(() => setCopySuccess(""), 2000); // Clear the message after 2 seconds
        }
    };

    return (
        <div className="p-4 bg-white min-h-screen">
            <div className="max-w-3xl mx-auto">
            
                {buttonGenerate && (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                        <form onSubmit={handleSubmit} className="p-4 space-y-3">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
                                    <Captions className="inline w-4 h-4 mr-1" />
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    className="w-full p-2 text-sm border border-gray-300 rounded-md text-black"
                                    placeholder="Enter Title ex: A Quiz on India"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="topic" className="block text-sm font-medium mb-1 text-gray-700">
                                    <BookOpen className="inline w-4 h-4 mr-1" />
                                    Topic Name
                                </label>
                                <input
                                    id="topic"
                                    type="text"
                                    className="w-full p-2 text-sm border border-gray-300 rounded-md text-black"
                                    placeholder="Ex: India"
                                    required
                                    value={topic}
                                    onChange={(e) => setTopicName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="noofQuestions" className="block text-sm font-medium mb-1 text-gray-700">
                                    <ListOrdered className="inline w-4 h-4 mr-1" />
                                    Number of Questions
                                </label>
                                <input
                                    id="noofQuestions"
                                    type="number"
                                    className="w-full p-2 text-sm border border-gray-300 rounded-md text-black"
                                    placeholder="Number"
                                    max={10}
                                    required
                                    value={noofQuestions}
                                    onChange={(e) => setNoofQuestions(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 flex items-center justify-center space-x-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span>Generating...</span>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Generate Quiz</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
              
        </div>
        </div>
    );
}

export default TakeaQuiz;

/*

[  {
        "_id": "668232f1df0f000599daa86b",
        "quizId": "6682204cf28071ef3e08acb8",
        "questionText": "What is the capital of India?",
        "options": {
            "1": "New Delhi",
            "2": "Mumbai",
            "3": "Kolkata",
            "4": "Chennai"
        },
        "correctAnswerIndex": 1,
        "explanation": "New Delhi is the capital of India.",
        "order": 1,
        "createdAt": "2024-07-01T04:39:13.013Z",
        "updatedAt": "2024-07-01T04:39:13.013Z",
        "__v": 0
    },
    {
        "_id": "66851f4666c92ef14ba528d4",
        "quizId": "6682204cf28071ef3e08acb8",
        "questionText": "What is the capital of India?",
        "options": {
            "1": "Mumbai",
            "2": "Delhi",
            "3": "Kolkata",
            "4": "Chennai"
        },
        "correctAnswerIndex": 2,
        "explanation": "Delhi is the capital of India.",
        "order": 1,
        "__v": 0,
        "createdAt": "2024-07-03T09:52:06.362Z",
        "updatedAt": "2024-07-03T09:52:06.362Z"
    },
    {
        "_id": "668232f1df0f000599daa86d",
        "quizId": "6682204cf28071ef3e08acb8",
        "questionText": "Who is the current Prime Minister of India?",
        "options": {
            "1": "Narendra Modi",
            "2": "Rahul Gandhi",
            "3": "Mamata Banerjee",
            "4": "Arvind Kejriwal"
        },
        "correctAnswerIndex": 1,
        "explanation": "Narendra Modi is the current Prime Minister of India.",
        "order": 2,
        "createdAt": "2024-07-01T04:39:13.322Z",
        "updatedAt": "2024-07-01T04:39:13.322Z",
        "__v": 0
    },
    {
        "_id": "66851f4666c92ef14ba528d5",
        "quizId": "6682204cf28071ef3e08acb8",
        "questionText": "Which river is known as the 'Ganges'?",
        "options": {
            "1": "Yamuna",
            "2": "Narmada",
            "3": "Godavari",
            "4": "Ganges"
        },
        "correctAnswerIndex": 4,
        "explanation": "The Ganges is a major river in India.",
        "order": 2,
        "__v": 0,
        "createdAt": "2024-07-03T09:52:06.364Z",
        "updatedAt": "2024-07-03T09:52:06.364Z"
    }]

 const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(!loading);
        setButtonGenerate(!buttonGenerate);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:3000/quiz/create-quiz", {
                title,
                topic
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const newQuizId = response.data.quizId;
            setQuizId(newQuizId);

            const generateQuestions = await axios.post("http://localhost:3000/question/generate", {
                quizId: newQuizId,
                topic,
                noofQuestions
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setQuestions(generateQuestions.data);
        } catch (error) {
            console.log(error);
        }
    };

    {
            "_id": "66866d61074768a1525b8b35",
            "quizId": "66866d44074768a1525b8b33",
            "questionText": "What is the source of River Ganga?",
            "options": [
                "Gangotri Glacier",
                "Yamunotri Glacier",
                "Kedarnath Glacier",
                "Badrinath Glacier"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Gangotri Glacier is the source of River Ganga.",
            "order": 1,
            "__v": 0,
            "createdAt": "2024-07-04T09:37:37.809Z",
            "updatedAt": "2024-07-04T09:37:37.809Z"
        },
        {
            "_id": "66866d61074768a1525b8b36",
            "quizId": "66866d44074768a1525b8b33",
            "questionText": "Which state does River Ganga flow through?",
            "options": [
                "Uttarakhand",
                "Uttar Pradesh",
                "Bihar",
                "West Bengal"
            ],
            "correctAnswerIndex": 3,
            "explanation": "River Ganga flows through Uttarakhand, Uttar Pradesh, Bihar, and West Bengal.",
            "order": 2,
            "__v": 0,
            "createdAt": "2024-07-04T09:37:37.810Z",
            "updatedAt": "2024-07-04T09:37:37.810Z"
        },
        {
            "_id": "66866d61074768a1525b8b37",
            "quizId": "66866d44074768a1525b8b33",
            "questionText": "What is the length of River Ganga?",
            "options": [
                "2,525 km",
                "2,414 km",
                "2,312 km",
                "2,200 km"
            ],
            "correctAnswerIndex": 0,
            "explanation": "River Ganga is 2,525 km long.",
            "order": 3,
            "__v": 0,
            "createdAt": "2024-07-04T09:37:37.812Z",
            "updatedAt": "2024-07-04T09:37:37.812Z"
        },
        {
            "_id": "66866d61074768a1525b8b38",
            "quizId": "66866d44074768a1525b8b33",
            "questionText": "Which city is considered the holiest along River Ganga?",
            "options": [
                "Varanasi",
                "Haridwar",
                "Allahabad",
                "Rishikesh"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Varanasi is considered the holiest city along River Ganga.",
            "order": 4,
            "__v": 0,
            "createdAt": "2024-07-04T09:37:37.812Z",
            "updatedAt": "2024-07-04T09:37:37.812Z"
        },
        {
            "_id": "66866d61074768a1525b8b39",
            "quizId": "66866d44074768a1525b8b33",
            "questionText": "Which river is considered the main tributary of River Ganga?",
            "options": [
                "Yamuna",
                "Kosi",
                "Gomti",
                "Ghaghara"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Yamuna is considered the main tributary of River Ganga.",
            "order": 5,
            "__v": 0,
            "createdAt": "2024-07-04T09:37:37.813Z",
            "updatedAt": "2024-07-04T09:37:37.813Z"
        },
        {
            "_id": "66866d61074768a1525b8b3a",
            "quizId": "66866d44074768a1525b8b33",
            "questionText": "Which state has the largest share of River Ganga's basin area?",
            "options": [
                "Uttar Pradesh",
                "Bihar",
                "West Bengal",
                "Uttarakhand"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Uttar Pradesh has the largest share of River Ganga's basin area.",
            "order": 6,
            "__v": 0,
            "createdAt": "2024-07-04T09:37:37.813Z",
            "updatedAt": "2024-07-04T09:37:37.813Z"
        },
        {
            "_id": "66866d61074768a1525b8b3b",
            "quizId": "66866d44074768a1525b8b33",
            "questionText": "Which river is considered the main tributary of River Ganga?",
            "options": [
                "Yamuna",
                "Kosi",
                "Gomti",
                "Ghaghara"
            ],
            "correctAnswerIndex": 0,
            "explanation": "Yamuna is considered the main tributary of River Ganga.",
            "order": 7,
            "__v": 0,
            "createdAt": "2024-07-04T09:37:37.814Z",
            "updatedAt": "2024-07-04T09:37:37.814Z"
        }

    */