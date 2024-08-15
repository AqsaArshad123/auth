import mongoose from "mongoose";

const userSchema=mongoose.Schema({
name:{type:String, required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
contact: { type: String, required: true },
gender: { type: String, required: true },
otp: String,
otpExpiration: Date,
});

const User=mongoose.model('User',userSchema);

export default User;

