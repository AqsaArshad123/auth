import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {validationResult} from 'express-validator';

import { sendEmail } from '../utils/email.js';

//Signup
export const newUser=async(request,response)=>{

    const errors=validationResult(request);
if(!errors.isEmpty()){
    return response.status(400).send({ errors: errors.array() });
}

    const {name,email,password,contact,gender}=request.body;

    try{
        const alreadyExist=await User.findOne({email});

        if(alreadyExist){
            return response.status(400).send('User already exists!');
        }

        //Hashing Techniques
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);

const user=await User.create({
    name, email, password:hashedPassword, contact, gender
});

const token=jwt.sign(
  {_id:user._id,
    name:user.name,
    email:user.email
  },
  process.env.JWT_SECRET,
  {expiresIn:'1h'}
);


response.status(201).json({token,
  user:{
    _id:user._id,
    name:user.name,
    email:user.email,
     contact: user.contact,
      gender: user.gender,}
});

    } catch (error){
        response.status(500).send('Server Error');
    }
};

//Login
export const loginUser=async(request,response)=>{
  const errors = validationResult(request);
 if (!errors.isEmpty()) {
    return response.status(400).send({ errors: errors.array() });
  }


    const {email,password}=request.body;

    try{
const user=await User.findOne({email});

const correctPassword= await bcrypt.compare(password, user.password);

if (!user || !correctPassword ){
return response.status(400).send('Invalid email or password');

}
const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
  response.json({ token });

    } catch(error){
        console.error(error.message);
response.status(500).send('Server Error');
    }
};


//Profile
export const Userprofile=async (request,response)=>{
try{
    const user=await User.findById(request.params.id);

    if(!user){
        return response.status(404).send('User not found');
    }

    
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            gender: user.gender,
        });
    } catch (error) {
        console.error('Error in Userprofile:', error.message);
        response.status(500).send('Server Error');
    }
};
// Forget Password
export const forgetPassword = async (request, response) => {
  const { email } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).send('User not found');
    }
    //6-digit OTP
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiration = Date.now() + 60000; 

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();


    await sendEmail(user.email, 'Forget Password and Reset OTP', ` Hey user! You requested a password reset. Your OTP is  ${resetToken}`);

    response.send('Password reset OTP sent to email');
    } catch (error) {
        console.error('Error in forgetPassword:', error.message);
        response.status(500).send('Server Error');
    }
};
// Reset Password

export const resetPassword = async (request, response) => {
  const { otp, newPassword } = request.body;

  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).send({ errors: errors.array() });
    }

    const user = await User.findOne({
      resetToken: otp,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return response.status(400).send('Invalid or expired OTP');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    response.send('Password has been reset');

  } catch (error) {
    console.error('Error in resetPassword:', error.message);
    response.status(500).send('Server Error');
  }
};
