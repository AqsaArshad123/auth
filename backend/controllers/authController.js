import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {body,validationResult} from 'express-validator';

import { sendEmail } from '../utils/email.js';

//validation
export const validateSignup=[
    body('name').notEmpty().withMessage('Name is required'),
     body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
  body('contact').notEmpty().withMessage('Contact is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Select a valid gender'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateNewPassword = [
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .notEmpty().withMessage('New password is required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
];

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

response.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
     contact: user.contact,
      gender: user.gender,
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

response.json({
    _id:user._id,
    name:user.name,
    email:user.email,
     contact: user.contact,
      gender: user.gender,
});
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
_id:user._id,
    name:user.name,
    email:user.email,
    contact: user.contact,
      gender: user.gender,
    });
} catch (error){
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
