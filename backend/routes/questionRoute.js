import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import axios from 'axios';
import Questions from '../models/Questions.js';
import mongoose from 'mongoose';

const questionRouter = express.Router();

questionRouter.post("/generate", authMiddleware, async (req, res) => {
    const {quizId,title,Number}=req.body;
    const topic = title || "India";
    const NoOfQuestion = Number|| 5;
    console.log(quizId);
    console.log(NoOfQuestion);
    console.log("Topic:", topic);

    const prompt = `You are a helpful AI assistant tasked with creating multiple-choice questions. Please generate ${NoOfQuestion} questions about ${topic}  following these instructions:
    
    1. Start your response with a valid JSON opening: 
    2. For each question, provide:
       - The question text
       - Four answer options labeled 1, 2, 3, and 4
       - The correct answer number
       - A brief explanation for the correct answer
    3. Format each question as a JSON object within the questions array
    4. Generate ${NoOfQuestion} questions as mentioned.
    5. End your response with a valid JSON closing:
    
    Remember to separate each question object with a comma, and do not include a comma after the last question. Ensure your entire response is valid JSON.
    `;

    console.log("Prompt:", prompt);

    try {
        const response = await axios.post(
            "https://api.together.xyz/v1/completions",
            {
                model: "mistralai/Mixtral-8x7B-v0.1",
                prompt: prompt,
                max_tokens: 1500,
                stop: "]"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("the response is", response);
        console.log("the response data", response.data);
        // const responseData = response.data; // Extracting data from the Axios response
        // res.json(responseData); // Sending the response data back to the client
        let responseData = response.data.choices[0].text.trim();
        responseData += ']'

        console.log("the data is", responseData);
        const jsonStart = responseData.indexOf('[');
        const jsonEnd = responseData.lastIndexOf(']') + 1;

        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("Invalid JSON response");
        }

        const jsonResponse = responseData.substring(jsonStart, jsonEnd);

        // Parse the JSON response to ensure it is valid
        const parsedData = JSON.parse(jsonResponse);

        const questionsToInsert=parsedData.map((question,index)=>({
            quizId:quizId,
            questionText: question.question,
            options:question.options,
            correctAnswerIndex:question.correct_answer,
            explanation:question.explanation,
            order:index+1
        }));
        
        await Questions.insertMany(questionsToInsert);
 
        // 1-indexed answer
        // for (let i = 0; i < parsedData.length; i++) {
        //     const newQuestion = await Questions.create({
        //         quizId: quizId,
        //         questionText: parsedData[i].question,
        //         options: parsedData[i].options,
        //         correctAnswerIndex: parsedData[i].correct_answer,
        //         explanation: parsedData[i].explanation,
        //         order: i + 1
        //     });
        // }
        // const pipeline=[
        //     {$match:{quizId:quizId}},
        //     {$sort:{order:1}}
        // ]
        // const questions=await Questions.aggregate(pipeline);
        const questions=await Questions.find({ quizId: quizId }).sort({ order: 1 });
        res.json(questions);
        // res.json(parsedData); 
    } catch (error) {
        console.error("Error generating questions:", error.message);
        res.status(500).send("Error generating questions");
    }


});

// questionRouter.post("/generate-questions",authMiddleware,async(req,res)=>{

// });
/*
"quizId": "6682204cf28071ef3e08acb8",
        "questionText": "Which is the largest river in India?",
        "options": {
            "1": "Ganga",
            "2": "Yamuna",
            "3": "Godavari",
            "4": "Krishna"
        },
        "correctAnswerIndex": 1,
        "explanation": "Ganga is the largest river in India.",
        "order": 7,
*/

// all the below can also be written under quizzes routes like quizzes/:quizId/question
questionRouter.post("/:quizId", authMiddleware, async (req, res) => {
   const quizId=req.params.quizId;
    try {
    const {questionText,options,correctAnswerIndex,explanation,order}=req.body;
    const addQuestion=await Questions.create({
        quizId,
        questionText,
        options,
        correctAnswerIndex,
        explanation,
        order
    });
    if(!addQuestion)
        return res.status(401).json({message:'error adding question'});
    return res.status(200).json({
        message:'Question added successfully',
        newQuestion:addQuestion
    });
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:'error occured'});
    }

});

questionRouter.put("/:questionId", authMiddleware, async (req, res) => {
    const questionId=req.params.questionId;
    try {
        const {questionText,options,correctAnswerIndex,explanation}=req.body;
        const editQuestion=await Questions.findByIdAndUpdate(questionId,
            {questionText,options,correctAnswerIndex,explanation},{new:true});
        if(!editQuestion)
            return res.status(401).json({message:'error editing the question'});
        return res.status(200).json({
            message:'Question edited successfully',
            editedQuestion:editQuestion
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:'error editing qquestion'});
    }
});

// if a pariculaar question is deleted the order of all next questions should be decreased by 1 right
questionRouter.delete("/:questionId", authMiddleware, async (req, res) => {
    const questionId=req.params.questionId;
    try {
        const deleteQuestion=await Questions.findByIdAndDelete(questionId);
        if(!deleteQuestion)
            return res.status(200).json({
        message:'question deleted successfully'
        });
        return res.status({message:'question deleted successfully'});
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:'error occured'}); 
    }

});


export default questionRouter;

// below is the example response
/*
[
    {
        "question": "What is the capital of India?",
        "options": {
            "a": "New Delhi",
            "b": "Mumbai",
            "c": "Kolkata",
            "d": "Chennai"
        },
        "correct_answer": "a",
        "explanation": "New Delhi is the capital of India."
    },
    {
        "question": "Who is the current Prime Minister of India?",
        "options": {
            "a": "Narendra Modi",
            "b": "Rahul Gandhi",
            "c": "Mamata Banerjee",
            "d": "Arvind Kejriwal"
        },
        "correct_answer": "a",
        "explanation": "Narendra Modi is the current Prime Minister of India."
    },
    {
        "question": "Which political party is Narendra Modi associated with?",
        "options": {
            "a": "Bharatiya Janata Party (BJP)",
            "b": "Indian National Congress (INC)",
            "c": "Aam Aadmi Party (AAP)",
            "d": "Communist Party of India (Marxist)"
        },
        "correct_answer": "a",
        "explanation": "Narendra Modi is associated with the Bharatiya Janata Party (BJP)."
    },
    {
        "question": "In which state did Narendra Modi serve as Chief Minister before becoming Prime Minister?",
        "options": {
            "a": "Gujarat",
            "b": "Maharashtra",
            "c": "Karnataka",
            "d": "Tamil Nadu"
        },
        "correct_answer": "a",
        "explanation": "Narendra Modi served as Chief Minister of Gujarat before becoming Prime Minister."
    },
    {
        "question": "What is Narendra Modi's middle name?",
        "options": {
            "a": "Rahul",
            "b": "Rajiv",
            "c": "Rahul",
            "d": "Rajiv"
        },
        "correct_answer": "c",
        "explanation": "Narendra Modi's middle name is Rahul."
    }
]  */