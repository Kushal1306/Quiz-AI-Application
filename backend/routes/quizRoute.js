import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Quizzes from '../models/Quizzes.js';
import delQuestionsMiddlware from '../middlewares/deleteQuestions.js';
import Questions from '../models/Questions.js';
import mongoose from 'mongoose';

const quizRouter = express.Router();


// we can also have visibility as of now we will have it public only 
quizRouter.post("/create-quiz", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const title=req.body.title;
        const topicName=req.body.topic;
        // const { title, description } = req.body;
        const newQuiz =await Quizzes.create({
            title:title,
            description:topicName,
            userId:userId
        });
        console.log(newQuiz);
        return res.status(201).json({
            message: 'User created successfully',
            quizId: newQuiz._id
        });

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'error creating quiz' });
    }
});

quizRouter.patch("/edit-quiz", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { title, description, quizId } = req.body;
        const updateQuiz = await Quizzes.findByIdAndUpdate(quizId, { title, description }, { new: true });
        console.log(updateQuiz);
        console.log(updateQuiz.data);
        if (!updateQuiz)
            return res.status(401).json({ message: "update request failed" });
        return res.status(203).json({ message: 'quiz updated successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "update request failed" });
    }
});

// Route to take quiz or play quiz
quizRouter.get("/all",authMiddleware,async(req,res)=>{
    const userId=req.userId;
    try {
        const myQuizzes=await Quizzes.find({userId:userId});
        if(!myQuizzes)
            return res.status(200).json({message:'no quizzes exist'});
        return res.status(200).json(myQuizzes);
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:'error occured'});
    }

});

quizRouter.get("/take-quiz/:quizId",authMiddleware,async(req,res)=>{
   const quizId=req.params.quizId;
   try {
       const questions=await Questions.find({quizId:quizId}).sort({order:1});
       res.status(200).json(questions);
   } catch (error) {
    console.error(error);
    return res.status(401).json({message:'Error occured'});
   }
});

//If we delete a quiz we should also delete questions under it right so first delete questions and then deleting quiz
// idea-2 we have a transaction in place deleting both or deleting none.
quizRouter.delete("/delete-quiz",authMiddleware,delQuestionsMiddlware,async(req,res)=>{
    try {
        const {quizId}=req.body;
        const deleteQuiz=await Quizzes.findByIdAndDelete(quizId);
        if(!deleteQuiz)
            return res.status(401).json({message:'Unable to delete the quiz'});
        return res.status(200).json({message:'Quiz deleted succesfully'});  
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "delete request failed" });
    }
});



export default quizRouter;