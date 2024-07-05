import React, { useState } from "react";
import { Edit3, Save, X, ChevronDown, ChevronUp, BookOpen, ListOrdered, Send, Captions, Trash, PlusCircle, Clipboard } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function TakeaQuiz() {
    const [title, setTitle] = useState("");
    const [topic, setTopicName] = useState("");
    const [noofQuestions, setNoofQuestions] = useState(5);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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

            await axios.post("https://quiz-ai-backend.vercel.app/question/generate", {
                quizId: newQuizId,
                topic,
                noofQuestions
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            navigate(`/play?quizId=${newQuizId}`);
        } catch (error) {
            setLoading(false);
            alert("An error occurred while generating the quiz. Please try again.");
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center p-4 bg-gray-100 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold">Creating your quiz...</p>
                    <p className="text-sm text-gray-600 mt-2">This may take a moment. Please wait.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white min-h-screen">
            <div className="max-w-3xl mx-auto">
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
                        >
                            <Send className="w-4 h-4" />
                            <span>Generate Quiz</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TakeaQuiz;