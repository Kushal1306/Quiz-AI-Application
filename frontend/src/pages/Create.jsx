import React, { useState } from "react";
import { Edit3, Save, X, ChevronDown, ChevronUp, BookOpen, ListOrdered, Send, Captions, Trash, PlusCircle,Clipboard } from 'lucide-react';
import axios from 'axios';

function Create() {
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


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setButtonGenerate(false);
    //     const token = localStorage.getItem("token");
    //     try {
    //         const response = await axios.post("https://quiz-ai-backend.vercel.app/quiz/create-quiz", {
    //             title,
    //             topic
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const newQuizId = response.data.quizId;
    //         setQuizId(newQuizId);

    //         const generateQuestions = await axios.post("https://quiz-ai-backend.vercel.app/question/generate", {
    //             quizId: newQuizId,
    //             topic,
    //             noofQuestions
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         setQuestions(generateQuestions.data);
    //         const myLink=`https://quiz-ai-app.vercel.app/play?quizId=${newQuizId}`
    //         setQuizLink(myLink);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setButtonGenerate(false);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("https://quiz-ai-backend.vercel.app/question/generate2", {
                title,
                topic,
                noofQuestions
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const newQuizId = response.data.quizId;
            const questions=response.data.questions;
            setQuizId(newQuizId);
            // setQuestions(generateQuestions.data);
            setQuestions(questions);
            const myLink = `https://www.quizai.tech/play?quizId=${newQuizId}`;
            setQuizLink(myLink);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (question) => {
        setEditingQuestionId(question._id);
        setEditedQuestion({ ...question });
    };

    const handleSave = async (questionId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`https://quiz-ai-backend.vercel.app/question/${questionId}`, editedQuestion, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setQuestions(questions.map(q => q._id === questionId ? response.data : q));
            setEditingQuestionId(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setEditingQuestionId(null);
    };

    const handleEditChange = (e, index) => {
        const { name, value } = e.target;
        setEditedQuestion(prev => {
            if (name === 'options') {
                const newOptions = [...prev.options];
                newOptions[index] = value;
                return { ...prev, options: newOptions };
            } else if (name === 'correctAnswerIndex') {
                return { ...prev, correctAnswerIndex: parseInt(value) };
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    const toggleExplanation = (questionId) => {
        setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
    };

    const handleDelete = async (questionId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`https://quiz-ai-backend.vercel.app/question/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setQuestions(questions.filter(q => q._id !== questionId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddQuestion = async () => {
        const token = localStorage.getItem("token");
        const newQuestion = {
            quizId: quizId,
            questionText: "",
            options: ["", "", "", ""],
            correctAnswerIndex: 0,
            explanation: ""
        };
        try {
            const response = await axios.post("https://quiz-ai-backend.vercel.app/question", newQuestion, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setQuestions([...questions, response.data]);
            setEditingQuestionId(response.data._id);
            setEditedQuestion(response.data);
        } catch (error) {
            console.error(error);
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
                {questions.length > 0 && (
                    <div className="space-y-4">
                        {quizLink && (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between">
        <span className="text-sm font-medium text-black truncate flex-grow mr-4">{title}</span>
        <button
            onClick={handleCopyToClipboard}
            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
            <Clipboard className="w-4 h-4 mr-1" />
            Copy Link
        </button>
    </div>
)}
{copySuccess && (
    <div className={`mt-2 p-2 text-sm rounded-md ${copySuccess === "Copied!" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {copySuccess}
    </div>
)}
                        {questions.map((question, index) => (
                            <div key={question._id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="text-md font-semibold text-black">
                                        Q {index + 1}
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(question)}
                                            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                        >
                                            <Edit3 className="w-4 h-4 mr-1" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(question._id)}
                                            className="flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                                        >
                                            <Trash className="w-4 h-4 mr-1" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    {editingQuestionId === question._id ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                name="questionText"
                                                value={editedQuestion.questionText}
                                                onChange={handleEditChange}
                                                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-black"
                                            />
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {editedQuestion.options.map((option, idx) => (
                                                    <div key={idx} className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="correctAnswerIndex"
                                                            value={idx}
                                                            checked={idx === editedQuestion.correctAnswerIndex}
                                                            onChange={handleEditChange}
                                                            className="mr-2"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="options"
                                                            value={option}
                                                            onChange={(e) => handleEditChange(e, idx)}
                                                            className="flex-grow p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-black"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <textarea
                                                name="explanation"
                                                value={editedQuestion.explanation}
                                                onChange={handleEditChange}
                                                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-black"
                                                rows="2"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleSave(question._id)}
                                                    className="flex items-center px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                                                >
                                                    <Save className="w-4 h-4 mr-1" />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="flex items-center px-3 py-1 text-sm bg-gray-200 text-black rounded-md hover:bg-gray-300 transition duration-300"
                                                >
                                                    <X className="w-4 h-4 mr-1" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-black">{question.questionText}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {question.options.map((option, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer text-sm ${
                                                            idx === question.correctAnswerIndex
                                                                ? 'bg-black text-white'
                                                                : 'bg-gray-100 text-black hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        <span className="mr-2">{idx + 1}.</span>
                                                        <p>{option}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => toggleExplanation(question._id)}
                                                    className="w-full flex justify-between items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-300 text-black text-sm"
                                                >
                                                    <span className="font-medium">Explanation</span>
                                                    {expandedQuestionId === question._id ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                                {expandedQuestionId === question._id && (
                                                    <div className="mt-2 p-2 bg-gray-50 rounded-md">
                                                        <p className="text-gray-700 text-sm">{question.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="mt-4">
                            <button
                                onClick={handleAddQuestion}
                                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Add New Question
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Create;

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

// import React, { useState } from "react";
// import { Edit3, Save, X, ChevronDown, ChevronUp, BookOpen, ListOrdered, Send, Captions, Trash, Clipboard } from 'lucide-react';
// import axios from 'axios';

// function Create() {
//     const [title, setTitle] = useState("");
//     const [topic, setTopicName] = useState("");
//     const [noofQuestions, setNoofQuestions] = useState(5);
//     const [buttonGenerate, setButtonGenerate] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [quizId, setQuizId] = useState("");
//     const [questions, setQuestions] = useState([]);
//     const [editingQuestionId, setEditingQuestionId] = useState(null);
//     const [editedQuestion, setEditedQuestion] = useState({});
//     const [expandedQuestionId, setExpandedQuestionId] = useState(null);
//     const [quizLink, setQuizLink] = useState("");
//     const [copySuccess, setCopySuccess] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setButtonGenerate(false);
//         const token = localStorage.getItem("token");
//         try {
//             // const response = await axios.post("http://localhost:3000/quiz/create-quiz", {
//             //     title,
//             //     topic
//             // }, {
//             //     headers: {
//             //         Authorization: `Bearer ${token}`,
//             //         'Content-Type': 'application/json'
//             //     }
//             // });
//             // const newQuizId = response.data.quizId;
//             // setQuizId(newQuizId);

//             // const generateQuestions = await axios.post("http://localhost:3000/question/generate2", {
//             //     quizId: newQuizId,
//             //     topic,
//             //     noofQuestions
//             // }, {
//             //     headers: {
//             //         Authorization: `Bearer ${token}`,
//             //         'Content-Type': 'application/json'
//             //     }
//             // });
//             // setQuestions(generateQuestions.data);
//             const response = await axios.post("http://localhost:3000/question/generate2", {
//                 title,
//                 topic,
//                 noofQuestions
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             const newQuizId = response.data.quizId;
//             const questions=response.data.questions;
//             setQuizId(newQuizId);
//             // setQuestions(generateQuestions.data);
//             setQuestions(questions);
//             const myLink = `https://quiz-ai-app.vercel.app/play?quizId=${newQuizId}`;
//             setQuizLink(myLink);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = (question) => {
//         setEditingQuestionId(question._id);
//         setEditedQuestion({ ...question });
//     };

//     const handleSave = async (questionId) => {
//         const token = localStorage.getItem("token");
//         try {
//             const response = await axios.put(`https://quiz-ai-backend.vercel.app/question/${questionId}`, editedQuestion, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             setQuestions(questions.map(q => q._id === questionId ? response.data : q));
//             setEditingQuestionId(null);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleCancel = () => {
//         setEditingQuestionId(null);
//     };

//     const handleEditChange = (e, index) => {
//         const { name, value } = e.target;
//         setEditedQuestion(prev => {
//             if (name === 'options') {
//                 const newOptions = [...prev.options];
//                 newOptions[index] = value;
//                 return { ...prev, options: newOptions };
//             } else if (name === 'correctAnswerIndex') {
//                 return { ...prev, correctAnswerIndex: parseInt(value) };
//             } else {
//                 return { ...prev, [name]: value };
//             }
//         });
//     };

//     const toggleExplanation = (questionId) => {
//         setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
//     };

//     const handleDelete = async (questionId) => {
//         const token = localStorage.getItem("token");
//         try {
//             await axios.delete(`https://quiz-ai-backend.vercel.app/question/${questionId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setQuestions(questions.filter(q => q._id !== questionId));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleCopyToClipboard = async () => {
//         try {
//             await navigator.clipboard.writeText(quizLink);
//             setCopySuccess("Copied!");
//             setTimeout(() => setCopySuccess(""), 2000);
//         } catch (error) {
//             console.error("Failed to copy: ", error);
//             setCopySuccess("Failed to copy!");
//             setTimeout(() => setCopySuccess(""), 2000);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto space-y-8">
//                 <div className="text-center">
//                     <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//                         Create Your Quiz
//                     </h2>
//                     <p className="mt-4 text-lg text-gray-600">
//                         Generate engaging quizzes in just a few clicks
//                     </p>
//                 </div>

//                 {buttonGenerate && (
//                     <div className="bg-white shadow-md rounded-lg p-6">
//                         <h3 className="text-lg font-semibold mb-4">Quiz Details</h3>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                                     <Captions className="inline w-4 h-4 mr-1" />
//                                     Title
//                                 </label>
//                                 <input
//                                     id="title"
//                                     type="text"
//                                     className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="Enter Title ex: A Quiz on India"
//                                     required
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
//                                     <BookOpen className="inline w-4 h-4 mr-1" />
//                                     Topic Name
//                                 </label>
//                                 <input
//                                     id="topic"
//                                     type="text"
//                                     className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="Ex: India"
//                                     required
//                                     value={topic}
//                                     onChange={(e) => setTopicName(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="noofQuestions" className="block text-sm font-medium text-gray-700 mb-1">
//                                     <ListOrdered className="inline w-4 h-4 mr-1" />
//                                     Number of Questions
//                                 </label>
//                                 <input
//                                     id="noofQuestions"
//                                     type="number"
//                                     className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                     placeholder="Number"
//                                     max={10}
//                                     required
//                                     value={noofQuestions}
//                                     onChange={(e) => setNoofQuestions(e.target.value)}
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center space-x-2"
//                                 disabled={loading}
//                             >
//                                 {loading ? (
//                                     <span>Generating...</span>
//                                 ) : (
//                                     <>
//                                         <Send className="w-4 h-4" />
//                                         <span>Generate Quiz</span>
//                                     </>
//                                 )}
//                             </button>
//                         </form>
//                     </div>
//                 )}

//                 {questions.length > 0 && (
//                     <div className="space-y-6">
//                         {quizLink && (
//                             <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
//                                 <span className="text-sm font-medium text-gray-700 truncate flex-grow mr-4">{title}</span>
//                                 <button
//                                     onClick={handleCopyToClipboard}
//                                     className="flex items-center px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                                 >
//                                     <Clipboard className="w-4 h-4 mr-1" />
//                                     Copy Link
//                                 </button>
//                             </div>
//                         )}
//                         {copySuccess && (
//                             <div className={`mt-2 p-2 text-sm rounded-md ${copySuccess === "Copied!" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                                 {copySuccess}
//                             </div>
//                         )}
//                         {questions.map((question, index) => (
//                             <div key={question._id} className="bg-white shadow-md rounded-lg overflow-hidden">
//                                 <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
//                                     <h3 className="text-md font-semibold text-gray-800">
//                                         Q {index + 1}
//                                     </h3>
//                                     <div className="flex space-x-2">
//                                         <button
//                                             onClick={() => handleEdit(question)}
//                                             className="flex items-center px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
//                                         >
//                                             <Edit3 className="w-4 h-4 mr-1" />
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(question._id)}
//                                             className="flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
//                                         >
//                                             <Trash className="w-4 h-4 mr-1" />
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="p-4">
//                                     {editingQuestionId === question._id ? (
//                                         <div className="space-y-3">
//                                             <input
//                                                 type="text"
//                                                 name="questionText"
//                                                 value={editedQuestion.questionText}
//                                                 onChange={handleEditChange}
//                                                 className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                             />
//                                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                                 {editedQuestion.options.map((option, idx) => (
//                                                     <div key={idx} className="flex items-center">
//                                                         <input
//                                                             type="radio"
//                                                             name="correctAnswerIndex"
//                                                             value={idx}
//                                                             checked={idx === editedQuestion.correctAnswerIndex}
//                                                             onChange={handleEditChange}
//                                                             className="mr-2"
//                                                         />
//                                                         <input
//                                                             type="text"
//                                                             name="options"
//                                                             value={option}
//                                                             onChange={(e) => handleEditChange(e, idx)}
//                                                             className="flex-grow p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                                         />
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                             <textarea
//                                                 name="explanation"
//                                                 value={editedQuestion.explanation}
//                                                 onChange={handleEditChange}
//                                                 className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                                 rows="2"
//                                                 placeholder="Explanation (optional)"
//                                             />
//                                             <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleSave(question._id)}
//                                                     className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//                                                 >
//                                                     <Save className="w-4 h-4 mr-1" />
//                                                     Save
//                                                 </button>
//                                                 <button
//                                                     onClick={handleCancel}
//                                                     className="flex items-center px-3 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
//                                                 >
//                                                     <X className="w-4 h-4 mr-1" />
//                                                     Cancel
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className="space-y-3">
//                                             <p className="text-sm font-medium text-gray-800">{question.questionText}</p>
//                                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                                 {question.options.map((option, idx) => (
//                                                     <div
//                                                         key={idx}
//                                                         className={`flex items-center p-2 rounded-md transition-all duration-300 cursor-pointer text-sm ${
//                                                             idx === question.correctAnswerIndex
//                                                                 ? 'bg-green-100 text-green-800'
//                                                                 : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
//                                                         }`}
//                                                     >
//                                                         <span className="mr-2">{idx + 1}.</span>
//                                                         <p>{option}</p>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                             <div>
//                                                 <button
//                                                     onClick={() => toggleExplanation(question._id)}
//                                                     className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-300 text-gray-700 text-sm mt-2"
//                                                 >
//                                                     <span className="font-medium">Explanation</span>
//                                                     {expandedQuestionId === question._id ? (
//                                                         <ChevronUp className="w-4 h-4" />
//                                                     ) : (
//                                                         <ChevronDown className="w-4 h-4" />
//                                                     )}
//                                                 </button>
//                                                 {expandedQuestionId === question._id && (
//                                                     <div className="mt-2 p-2 bg-gray-50 rounded-md">
//                                                         <p className="text-gray-700 text-sm">{question.explanation}</p>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Create;
