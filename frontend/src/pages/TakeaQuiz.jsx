import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit3, Save, X, ChevronDown, ChevronUp, BookOpen, ListOrdered, Send, Captions, Trash, Clipboard, Download,CircleHelp,Languages,Star } from 'lucide-react';
import axios from 'axios';
import Select from "../components/Select";
import InputBox2 from "../components/InputBox2";
import DownloadButton from "../components/DownloadOption";
import { Button } from "../components/Button";
import pdfToText from 'react-pdftotext';


function TakeaQuiz() {
    // const [title, setTitle] = useState("");
    // const [topic, setTopicName] = useState("");
    // const [noofQuestions, setNoofQuestions] = useState(5);
    // const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
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

    //         await axios.post("https://quiz-ai-backend.vercel.app/question/generate", {
    //             quizId: newQuizId,
    //             topic,
    //             noofQuestions
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         navigate(`/play?quizId=${newQuizId}`);
    //     } catch (error) {
    //         setLoading(false);
    //         alert("An error occurred while generating the quiz. Please try again.");
    //         console.error(error);
    //     }
    // };

 const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [noofQuestions, setNoofQuestions] = useState(3);
  const [loading, setLoading] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [quizLink, setQuizLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [questionType,setQuestionType]=useState('MCQ');
  const [language,setLanguage]=useState('ENGLISH');
  const [activeTab,setActiveTab]=useState('topic');
  const [content,setContent]=useState('');
  const [file,setFile]=useState(null);
  const [difficulty,setdifficulty]=useState('MEDIUM');

  const options=[
    {value:'MCQ',label:'MCQ'},
    {value:'TF',label:'True and False' },
    {value:'Mixed',label:'Mixed'}
  ]
  const languageOptions=[
    {value:'English',label:'English'},
    {value:'Hindi',label:'Hindi'},
    {value:'Telugu',label:'Telugu'},
    {value:'Tamil',label:'Tamil'},
    {value:'Spanish',label:'Spanish'},
    {value:'French',label:'French'}
  ]

  const questiondifficulty=[
    {value:'easy',label:'Easy'},
    {value:'medium',label:'Medium'},
    {value:'hard',label:'Hard'}
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    console.log("Debug - State variables:", { title, content, file, questionType, noofQuestions, language, difficulty });

    try {
      const response = await axios.post("https://quiz-ai-backend.vercel.app/question/generate2",{
       title, 
       content,
       questionType,
       noofQuestions,
       language, 
       difficulty 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const newQuizId = response.data.quizId;
      navigate(`/play?quizId=${newQuizId}`);
    //   const newQuizId = response.data.quizId;
    //   const generatedQuestions = response.data.questions;
    //   setQuizId(newQuizId);
    //   setQuestions(generatedQuestions);
    //   setQuizLink(`https://www.quizai.tech/play?quizId=${newQuizId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
     if(activeTab==='topic'||activeTab==='content')
     {
      setContent('');
      setFile(null); 
     }
     
  },[activeTab]);

  function extractText(event) {
    const file = event.target.files[0]
    setFile(file);
    pdfToText(file)
        .then((text) => {
          setContent(text);
          console.log(text);
  }).catch(error => console.error("Failed to extract text from pdf"))
}

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

    // return (
    //     <div className="p-4 bg-white min-h-screen">
    //         <div className="max-w-3xl mx-auto">
    //             <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
    //                 <form onSubmit={handleSubmit} className="p-4 space-y-3">
    //                     <div>
    //                         <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
    //                             <Captions className="inline w-4 h-4 mr-1" />
    //                             Title
    //                         </label>
    //                         <input
    //                             id="title"
    //                             type="text"
    //                             className="w-full p-2 text-sm border border-gray-300 rounded-md text-black"
    //                             placeholder="Enter Title ex: A Quiz on India"
    //                             required
    //                             value={title}
    //                             onChange={(e) => setTitle(e.target.value)}
    //                         />
    //                     </div>
    //                     <div>
    //                         <label htmlFor="topic" className="block text-sm font-medium mb-1 text-gray-700">
    //                             <BookOpen className="inline w-4 h-4 mr-1" />
    //                             Topic Name
    //                         </label>
    //                         <input
    //                             id="topic"
    //                             type="text"
    //                             className="w-full p-2 text-sm border border-gray-300 rounded-md text-black"
    //                             placeholder="Ex: India"
    //                             required
    //                             value={topic}
    //                             onChange={(e) => setTopicName(e.target.value)}
    //                         />
    //                     </div>
    //                     <div>
    //                         <label htmlFor="noofQuestions" className="block text-sm font-medium mb-1 text-gray-700">
    //                             <ListOrdered className="inline w-4 h-4 mr-1" />
    //                             Number of Questions
    //                         </label>
    //                         <input
    //                             id="noofQuestions"
    //                             type="number"
    //                             className="w-full p-2 text-sm border border-gray-300 rounded-md text-black"
    //                             placeholder="Number"
    //                             max={10}
    //                             required
    //                             value={noofQuestions}
    //                             onChange={(e) => setNoofQuestions(e.target.value)}
    //                         />
    //                     </div>
    //                     <button
    //                         type="submit"
    //                         className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
    //                         >
    //                         <Send className="w-4 h-4" />
    //                         <span>Generate Quiz</span>
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );
    return(
        <div className="w-full max-w-md mx-auto ">
        <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Test Your Knowledge</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-1 mb-6">
              {['topic', 'content', 'file'].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                  className={`flex-1 py-2 rounded-lg ${
  
                    activeTab === tab
                      ? 'bg-gray-200 text-black'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                />
              ))}
            </div>
  
            {activeTab === 'topic' && (
              <InputBox2
                id="topic"
                type="text"
                label="Topic Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: India"
                required
                icon={BookOpen}
              />
            )}
  
            {activeTab === 'content' && (
              <InputBox2
                id="content"
                type="textarea"
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter additional content or instructions here"
                icon={Edit3}
              />
            )}
  
            {activeTab === 'file' && (
              <InputBox2
                id="file"
                type="file"
                label="Upload File"
                onChange={extractText}
                icon={Clipboard}
              />
            )}
            { (activeTab==='file' && file)?( <InputBox2
                id="content"
                type="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                icon={Edit3}
              />):(<></>)
              }
              
  
            <div className="grid grid-cols-2 gap-4">
              <Select
                options={options}
                label="Question Type"
                value={questionType}
                icon={CircleHelp}
                id="questionType"
                onChange={(e) => setQuestionType(e.target.value)}
                required
              />
  
              <InputBox2
                id="noofQuestions"
                type="number"
                label="Number of Questions"
                value={noofQuestions}
                onChange={(e) => setNoofQuestions(e.target.value)}
                placeholder="Number"
                required
                min={1}
                max={10}
                icon={ListOrdered}
              />
              <Select
                options={languageOptions}
                label="Language"
                value={language}
                icon={Languages}
                onChange={(e) => setLanguage(e.target.value)}
                id="language"
                required
              />
               <Select
                options={questiondifficulty}
                label="Difficulty"
                value={difficulty}
                icon={Star}
                onChange={(e) => setdifficulty(e.target.value)}
                id="difficulty"
                required
              />
            </div>
            
            <Button
              type="submit"
              label={loading ? "Generating..." : "Generate Quiz"}
              className="w-full py-1.5 bg-black text-white  rounded-lg"
              disabled={loading}
              icon={Send}
            />
          </form>
        </div>
      </div>

    );
}

export default TakeaQuiz;