import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Quizzes from '../models/Quizzes.js';
import delQuestionsMiddlware from '../middlewares/deleteQuestions.js';

const quizRouter = express.Router();


// we can also have visibility as of now we will have it public only 
quizRouter.post("/create-quiz", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { title, description } = req.body;
        const newQuiz = Quizzes.create({
            title,
            description
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