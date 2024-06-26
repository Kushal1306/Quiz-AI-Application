import mongoose from "mongoose";

const userSchema=new mongoose.Schema({

    name:{type:String},
    email:{type:String, required:true, unique:true}

},{timestamps:true});

const Users=mongoose.model("Users",userSchema);

export default Users;