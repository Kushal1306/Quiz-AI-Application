import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import Users from "../models/Users.js";
import launch from "../models/Launch.js";
import jwt from 'jsonwebtoken';
import zod from 'zod';
import bcrypt from 'bcrypt';
import { OAuth2Client } from "google-auth-library";
import authMiddleware from "../middlewares/authMiddleware.js";
const client=new OAuth2Client();

const UserRouter = express.Router();

const signupSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string()

})

UserRouter.post("/signup", async (req, res) => {
  const { userName, password, firstName, lastName } = req.body;
  try {
    const { success } = signupSchema.safeParse(req.body);
    if (!success)
      return res.status(401).json({ message: 'invalid credentials' });
    const existingUser = await Users.findOne({ userName: userName });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });
    const newUser = new Users({
      userName,
      password,
      firstName,
      lastName
    });
    const response = await newUser.save();
    console.log(response);
    if (response) {
      const token = jwt.sign({
        userId: response._id

      }, process.env.JWT_SECRET);
      return res.status(201).json({
        token: token,
        message: 'user created Successfully'
      })
    }
    return res.status(401).json({ message: 'request failed' });

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'request failed' });
  }

});

const signinbody=zod.object({
  userName:zod.string().email(),
  password:zod.string()
});

UserRouter.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  const {success}=signinbody.safeParse(req.body);
  if(!success)
    return res.status(402).json({message:"invalid credentails"});
  try {
    const existingUser = await Users.findOne({ userName: userName });
    if (!existingUser)
      return res.status(400).json({ message: 'User Doesnt exist ' });
    const passwordMatch=await bcrypt.compare(password,existingUser.password);
    if(!passwordMatch)
      return res.status(401).json({message:'password doesnt match/ wrong credentails'});

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      token: token,
      message: 'user SignedIn Successfully'
    });

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'request failed' });
  }

});

UserRouter.post("/google-signin",async(req,res)=>{
  const token=req.body.token;
  console.log(token);
  try {
    const ticket=await client.verifyIdToken({
      idToken:token,
      audience:process.env.GOOGLE_CLIENT_ID
    });
    const payload=ticket.getPayload();
    const googleId=payload['sub'];
    const userName=payload['email'];
    const firstName=payload['given_name'];
    const lastName=payload['family_name'];
    let user=await Users.findOne({userName:userName});
    if(!user){
      user=await Users.create({
        userName,
        firstName,
        lastName,
        googleId:googleId
      });
    }
    const jwtToken=jwt.sign({
      userId:user._id
    },process.env.JWT_SECRET);
    return res.status(200).json({messsage:'signed in successfully with google',
      token:jwtToken
    });
    
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    res.status(400).json({ message: "Invalid Google token" });
  }

});

UserRouter.post("/launch", async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email);
    const userExists = await launch.findOne({ email: email });
    console.log(userExists);
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const newUser = new launch({
      email:email
    });
    await newUser.save();
    return res.status(201).json({ message: 'user registered successfully' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

});


// UserRouter.post("/question", async (req, res) => {
//   const topic = req.query.text || "India";
//   const NoOfQuestion = req.query.number || "India";
//   console.log("Topic:", topic);

//   const prompt = `You are a helpful AI assistant tasked with creating multiple-choice questions. Please generate ${NoOfQuestion} questions about ${topic}  following these instructions:
  
//   1. Start your response with a valid JSON opening: 
//   2. For each question, provide:
//      - The question text
//      - Four answer options labeled a, b, c, and d
//      - The correct answer letter
//      - A brief explanation for the correct answer
//   3. Format each question as a JSON object within the questions array
//   4. End your response with a valid JSON closing:
  
//   Remember to separate each question object with a comma, and do not include a comma after the last question. Ensure your entire response is valid JSON.
//   `;

//   console.log("Prompt:", prompt);

//   try {
//     const response = await axios.post(
//       "https://api.together.xyz/v1/completions",
//       {
//         model: "mistralai/Mixtral-8x7B-v0.1",
//         prompt: prompt,
//         max_tokens: 1500,
//         stop: "]"
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("the response is", response);
//     console.log("the response data", response.data);
//     // const responseData = response.data; // Extracting data from the Axios response
//     // res.json(responseData); // Sending the response data back to the client
//     let responseData = response.data.choices[0].text.trim();
//     responseData += ']'

//     console.log("the data is", responseData);
//     const jsonStart = responseData.indexOf('[');
//     const jsonEnd = responseData.lastIndexOf(']') + 1;

//     if (jsonStart === -1 || jsonEnd === -1) {
//       throw new Error("Invalid JSON response");
//     }

//     const jsonResponse = responseData.substring(jsonStart, jsonEnd);

//     // Parse the JSON response to ensure it is valid
//     const parsedData = JSON.parse(jsonResponse);

//     res.json(parsedData); //
//   } catch (error) {
//     console.error("Error generating questions:", error.message);
//     res.status(500).send("Error generating questions");
//   }
// });

//get details of user using the site "me"
UserRouter.get("/me",authMiddleware,async(req,res)=>{
     const userId=req.userId;
     try {
      //retrieving all details except password
      const user=await Users.findById(userId).select('-password');
      if(!user)
        return res.status(401).json({message:'Error occured'});
      console.log(user);
      return res.json(user);
      
     } catch (error) {
       console.error(error);
       return res.status(401).json({message:'Error occured'});
     } 
})

// updating details of user
UserRouter.patch("/me",authMiddleware,async(req,res)=>{
       const userId=req.userId;
       const {firstName,lastName,password}=req.body;
       try {
        const updateUser=await Users.findByIdAndUpdate(userId,req.body,{new:true});
        if(!updateUser)
          return res.status(401).json({message:'User details not updated'});
        return res.status(200).json({
          message:'details updated successfully',
          details:updateUser
        });
       } catch (error) {
        console.error(error);
       return res.status(401).json({message:'Error occured'});
       }
});


export default UserRouter;