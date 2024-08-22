import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const subscriptionRouter=express.Router();

subscriptionRouter.post("/success",(req,res)=>{
  const event=req.body;
  console.log("the event body is:",req.body);
  if(event&&event.event==='subscription.success'){
    const subscriptionData=event.data;
    console.log(subscriptionData);
    res.status(200).send('Webhook received');
  }
  else{
    res.status(400).send('Invalid event type');
  }

});

subscriptionRouter.post("/failed",(req,res)=>{
    const event=req.body;
    console.log(req.body);
    if(event&&event.event==='subscription.failed'){
      const subscriptionData=event.data;
      console.log(subscriptionData);
      res.status(200).send('Webhook received');
    }
    else{
      res.status(400).send('Invalid event type');
    }
  
  });
export default subscriptionRouter;