import express from 'express';
import signatureMiddleware from '../middlewares/lemonsignatureMiddleware.js';

const subscriptionRouter=express.Router();

subscriptionRouter.post("/success",signatureMiddleware,(req,res)=>{
  const event=req.body;
  console.log("the event body is:",req.body);
  if(event.meta.event_name==="subscription_payment_success"){
    const subscriptionData=event.data;
    console.log(subscriptionData);
    const orderId = event.data.id;
    const customerId = event.data.attributes.customer_id;
    const totalPrice = event.data.attributes.total;
    const userName=event.data.attributes.user_name;
    const user_email=event.data.attributes.user_email;
    return res.status(200).json({
        message:`Order of total price ${totalPrice} by ${userName} received. \n customerid:${customerId}\n orderid:${orderId}\n  emailid: ${user_email}`
    })
  }
  else{
    return res.status(400).send('Invalid event type');
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