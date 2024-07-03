import React,{useState} from "react";

import { useEffect } from "react";
import { InputBox } from "../components/InputBox";
import { BookOpen, ListOrdered, Send } from 'lucide-react';

import axios from 'axios';

function Create() {
    const [title,setTitle]=useState("");
    const [topic,settopicName]=useState("");
    const [noofQuestions,setNoofQuestions]=useState(5);
    const [buttonGenerate,setButtonGenerate]=useState(false);
    const [loading,setLoading]=useState(false);
    const [quizId,setQuizId]=useState("");
    const [questions,setQuestions]=useState([]);

    useEffect(()=>{
        // const token=localStorage.getItem("token");
        // const createQuizAndGenerateQuestion=async()=>{
        //   const myQuiz=await axios.post("http://localhost:3000/quiz/create-quiz",{
        //     title,
        //     topic
        //   },{
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //       }
        //   });
        //   setQuizId(myQuiz.data.quizId);
    
        //   const generate=await axios.post("http://localhost:3000/question/generate",{
        //      quizId,
        //      topic,
        //      noofQuestions
        //    },{
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         'Content-Type': 'application/json'
        //       }
        //    })
        // };
        // createQuizAndGenerateQuestion();
    },[buttonGenerate])


  return (
<div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4 pt-8 md:pt-10">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-auto p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-3">Generate Quiz</h2>
        <form className="space-y-6 md:space-y-0 md:flex md:items-end md:space-x-4">
          <div className="md:flex-1">
            <label htmlFor="topic" className="block text-gray-700 font-semibold mb-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <span>Topic</span>
              </div>
            </label>
            <input
              id="topic"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter topic"
            />
          </div>
          <div className="md:flex-1">
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
              <div className="flex items-center space-x-2">
                <span>Content</span>
              </div>
            </label>
            <input
              id="content"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter content"
            />
          </div>
          <div className="md:w-40">
            <label htmlFor="noofQuestions" className="block text-gray-700 font-semibold mb-2">
              <div className="flex items-center space-x-2">
                <ListOrdered className="w-5 h-5 text-indigo-500" />
                <span>Questions</span>
              </div>
            </label>
            <input
              id="noofQuestions"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Number"
            />
          </div>
          <button
            type="button"
            className="w-full md:w-auto bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Generate</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create