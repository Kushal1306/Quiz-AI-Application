import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw, Award } from 'lucide-react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function Play() {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("quizId");
  console.log('Quiz ID:', quizId);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [title, setTitle] = useState("India");
  const [answerStatus, setAnswerStatus] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`https://quiz-ai-backend.vercel.app/quiz/take-quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response Data:', response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setQuestions(response.data);
        } else {
          console.error('No questions received or invalid data format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };
    const fetchtitle = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`https://quiz-ai-backend.vercel.app/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTitle(response.data.title);
        console.log(response.data.title);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    }
    fetchtitle();
    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    console.log('Questions state updated:', questions);
    console.log('Current Question:', currentQuestion);
    console.log('Questions Length:', questions.length);
    if (currentQuestion === questions.length && questions.length > 0 && !showResults) {
      setShowResults(true);
    }
  }, [currentQuestion, questions, showResults]);

  const handleAnswer = (answer) => {
    if (currentQuestion >= questions.length) {
      console.error('Attempting to answer question out of bounds');
      return;
    }
    const question = questions[currentQuestion];
    console.log('Answering question:', question);
    const isCorrect = answer === question.correctAnswerIndex;
    setUserAnswers({ ...userAnswers, [currentQuestion]: answer });
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setScore(score + question.score);
    }

    setTimeout(() => {
      setAnswerStatus(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const totalPossibleScore = questions.reduce((total, question) => total + question.score, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <div className="text-center text-white">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <div className="text-center text-white">
          <p>No questions available. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-white">{title}</h1>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        {showResults ? (
          <div className="text-center">
            <Award className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Quiz Completed!</h2>
            <p className="text-xl sm:text-2xl mb-4 sm:mb-6 text-gray-300">
              Your Score: <span className="font-bold text-yellow-400">{score}</span> / {totalPossibleScore}
            </p>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4 sm:mb-6">
              <div
                className="bg-yellow-400 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(score / totalPossibleScore) * 100}%` }}
              ></div>
            </div>
            {submitStatus === 'submitting' && (
              <p className="text-blue-400 mb-3">Submitting results...</p>
            )}
            {submitStatus === 'success' && (
              <p className="text-green-400 mb-3">Results submitted successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 mb-3">Error submitting results. Please try again.</p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center text-base sm:text-lg font-semibold"
            >
              <RefreshCw className="mr-2" size={20} /> Retake Quiz
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-xl sm:text-2xl mb-2 text-white">{questions[currentQuestion].questionText}</p>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-400">Points: {questions[currentQuestion].score}</p>
            <div className="space-y-3 sm:space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answerStatus !== null}
                  className={`w-full p-3 sm:py-2 sm:px-3 rounded-lg text-left transition duration-300 flex items-center ${
                    answerStatus !== null && index === questions[currentQuestion].correctAnswerIndex
                      ? 'bg-green-600 text-white'
                      : answerStatus !== null && userAnswers[currentQuestion] === index
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  } ${answerStatus !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {answerStatus !== null && index === questions[currentQuestion].correctAnswerIndex && (
                    <CheckCircle className="mr-2 sm:mr-3 text-white" size={20} />
                  )}
                  {answerStatus !== null && userAnswers[currentQuestion] === index && index !== questions[currentQuestion].correctAnswerIndex && (
                    <XCircle className="mr-2 sm:mr-3 text-white" size={20} />
                  )}
                  <span className="text-base sm:text-lg">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}
         <div className="mt-3 text-center text-sm text-gray-500">
          Generated by AI @QuizAI
        </div>
      </div>
    </div>
  );
}