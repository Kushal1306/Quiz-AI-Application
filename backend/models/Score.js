import mongoose from "mongoose";

const scoreSchema=mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quizzes'
    },
    userId:{
        tyoe:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    status:{
        type:String,
        enum:["ongoing","completed"],
        default:"ongoing"
    },
    score:{
        type:Number
    }
},{timestamps:true});

const Scores=mongoose.model("Scores",scoreSchema);

export default Scores;