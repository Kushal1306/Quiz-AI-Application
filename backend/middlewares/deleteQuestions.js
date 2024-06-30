import express from 'express';
import mongoose from 'mongoose';
import Questions from '../models/Questions.js';

const delQuestionsMiddlware=async(req,res,next)=>{
    try {
        const quizId=req.body.quizId;
        const deleteQuestions=await Questions.deleteMany({quizId:quizId});
        if(!deleteQuestions)
            return res.status(401).json({message:'Questions werenot deleted'});
        next();
        
    } catch (error) {
      console.log(error);
      return res.status(401).json({message:'unable to delete questions'})
    }
};

export default delQuestionsMiddlware;