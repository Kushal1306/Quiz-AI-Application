import express from 'express';
import mongoose from 'mongoose';
import CreditsModel from '../models/Credits.js';
const creditsMiddleware=async(req,res,next)=>{
    try {
        const userId=req.userId;
        const availableCredits=await CreditsModel.findOne({userId:req.userId});
        console.log(availableCredits);
        const updateCredits=await CreditsModel.updateOne({userId:req.userId},{$inc:{credits:-1}});
        if(availableCredits.credits<0)
            return res.status(401).json({message:'Credits exhausted'});
        next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({message:'unable to check credits'});
    }
};

export default creditsMiddleware;