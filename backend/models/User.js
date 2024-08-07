import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema=mongoose.Schema({
name:{type:String, required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
contact: { type: String, required: true },
gender: { type: String, required: true }
});



const User=mongoose.model('User',userSchema);

export default User;

