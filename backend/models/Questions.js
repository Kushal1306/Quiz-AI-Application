import mongoose, { Schema } from "mongoose";

const QuestionSchema=mongoose.Schema({
  quizId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Quizzes'
  },
  questionText:{
    type:String,
  },
  options:{
    type:Schema.Types.Mixed,

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

QuestionSchema.index({ quizId: 1, order: 1 });

const Questions=mongoose.model("Questions",QuestionSchema);

export default Questions;
