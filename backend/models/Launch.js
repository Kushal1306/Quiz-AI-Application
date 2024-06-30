import mongoose from "mongoose";
const launchSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true
    }
},{timestamps:true});

const launch=mongoose.model("launch",launchSchema);

export default launch;