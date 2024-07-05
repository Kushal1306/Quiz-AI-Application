import express from 'express';
import mongoose from 'mongoose';
import Scores from '../models/Score.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const scoreRouter=express.Router();

scoreRouter.post("/:quizId",authMiddleware,async(req,res)=>{
    const quizId=req.params.quizId;
    const userId=req.userId;
    const score=req.body.score;
    try {
        const newScore=await Scores.create({
            quizId:quizId,
            userId:userId,
            score:score
        });
        if(!newScore)
            return res.status(401).json({message:'Error occured while posting score'});
        return res.status(201).json({message:'score added successfully'});

    } catch (error) {
        console.error(error);
        return res.status(401).json({message:'unable to add score.'});
    }
});


scoreRouter.get("/leaderboard/:quizId",authMiddleware,async(req,res)=>{
      const quizId=req.params.quizId;
      try {
        const leaderboard=await Scores.find({quizId:quizId}).sort({score:-1}).populate('userId','firstName');
        if(!leaderboard)
            return res.status(401).json({message:'error fetching leaderboard'});
        return res.status(200).json({message:'leaderboard generated successfully',
            leaderboard:leaderboard
        });
      } catch (error) {
        console.error(erorr);
        return res.status(401).json({message:'Internal server error'});
      }

});

// getting score of a particular user for quiz

scoreRouter.get("/:quizId/me",authMiddleware,async(req,res)=>{
   const quizId=req.params.quizId;
   const userId=req.userId;
   try {
    const myScore=await Scores.findOne({
        $and:[
           {quizId:quizId},
           {userId:userId}
        ]
    });
    if(!myScore)
        return res.status(400).json({
    message:'error generating your score'
    });

    
   } catch (error) {
     console.error(erorr);
     return res.status(401).json({message:'Internal server error'});
   }
});

export default scoreRouter;