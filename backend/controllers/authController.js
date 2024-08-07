import bcrypt from 'bcryptjs';
import User from '../models/User.js';

//Signup
export const newUser=async(request,response)=>{
    const {name,email,password}=request.body;

    try{
        const alreadyExist=await User.findOne({email});

        if(alreadyExist){
            return response.status(400).send('User already exists!');
        }

        //Hashing Techniques
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);

const user=await User.create({
    name, email, password:hashedPassword
});

response.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
});

    } catch (error){
        response.status(500).send('Server Error');
    }
};

//Login
export const loginUser=async(request,response)=>{

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
    });
} catch (error){
response.status(500).send('Server Error');
}


};



