import mongoose from "mongoose";

const QuizSchema=new mongoose.Schema({
 title:{
    type:String
 },
 description:{
    type:String
 },
 userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
 },
 visibility:{
    type:String,
    enum:["public","private"],
    default:"public"
 },
 quizkey:{
    type:Number
 }
},{
    timestamps:true
});

const Quizzes=mongoose.model("Quizzes",QuizSchema);

export default Quizzes;