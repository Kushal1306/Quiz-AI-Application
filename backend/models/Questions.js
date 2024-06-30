import mongoose from "mongoose";

const QuestionSchema=mongoose.Schema({
  quizId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Quizzes'
  },
  questionTest:{
    type:String,
  },
  options:{
    type:["String"]
  },
  correctAnswerIndex:{
   type:Number
  },
  explanation:{
    type:String
  },
  order:{
    type:Number
  }
},
{timestamps:true}
);

const Questions=mongoose.model("Questions",QuestionSchema);

export default Questions;
