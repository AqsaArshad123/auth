import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';



//Signup
export const newUser=async(request,response,next)=>{

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

    } catch (error) {
    next(error); 
  }
};

//Login
export const loginUser=async(request,response,next)=>{

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

    } catch (error) {
    next(error); 
  }
};


//Profile
export const Userprofile = async (request, response,next) => {
  const { id } = request.body;  

  try {
    const user = await User.findById(id);

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
    next(error); 
  }
};

// Forget Password
export const forgetPassword = async (request, response,next) => {
  const { email } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).send('User not found');
    }
    //6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //OTP encryption
     const salt = await bcrypt.genSalt(10);
    const encryptedOTP = await bcrypt.hash(otp, salt);
  
    const otpExpiration = Date.now() + 3600000; 

    user.OTP = encryptedOTP;
    user.OTPExpiration =otpExpiration;
    await user.save();


    await sendEmail(user.email, 'Forget Password and Reset OTP', ` Hey user! You requested a password reset. Your OTP is  ${otp}`);

    response.send('Password reset OTP sent to email');
    } catch (error) {
    next(error); 
  }
};
// Reset Password

export const resetPassword = async (request, response,next) => {
  const { email, otp, newPassword } = request.body;

  try {
const user=await User.findOne({email});

if(!user){
  return response.status(404).send('User not found');
}

if (!user.OTP) {
      return response.status(400).send('Invalid Request or no previous Forgot Password request exists');
    }

//verifying OTP
const otpMatch=await bcrypt.compare(otp,user.OTP);
if(!otpMatch || Date.now()>user.OTPExpiration){
  return response.status(400).send('Invalid or Expired OTP');
}


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.OTP = undefined;
    user.OTPExpiration = undefined;

    await user.save();

    response.send('Password has been reset');

  } catch (error) {
    next(error); 
  }
};
