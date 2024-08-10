import mongoose from "mongoose";

const CreditSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    credits:{
        type:Number,
        default:10
    }
},{timestamps:true});

const CreditsModel=mongoose.model("CreditsModel",CreditSchema);

export default CreditsModel;