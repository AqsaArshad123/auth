import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';

//Signup
export const signup = async (request, response, next) => {
    const { name, email, password, contact, gender } = request.body;

    try {
        const alreadyExist = await User.findOne({ email });

        if (alreadyExist) {
            return response.status(400).json({ message: 'User already exists!' });
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            contact,
            gender
        });

        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        response.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                gender: user.gender
            }
        });

    } catch (error) {
        next(error);
    }
};

//Login
export const login = async (request, response, next) => {
    const { email, password } = request.body;

    try {
        const user = await User.findOne({ email });

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!user || !correctPassword) {
            return response.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        response.status(200).json({ token });

    } catch (error) {
        next(error);
    }
};

//Profile
export const me = async (request, response, next) => {
    const { id } = request.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        response.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            gender: user.gender
        });
    } catch (error) {
        next(error);
    }
};

// Forget Password
export const forgetPassword = async (request, response, next) => {
    const { email } = request.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // OTP encryption
        const salt = await bcrypt.genSalt(10);
        const encryptedOTP = await bcrypt.hash(otp, salt);
        const otpExpiration = new Date(Date.now() + 3600000); 
        user.otp = encryptedOTP;
        user.otpExpiration = otpExpiration;
        await user.save();
        await sendEmail(user.email, 'Forget Password and Reset OTP', `Hey user! You requested a password reset. Your OTP is ${otp}`);

        response.status(200).json({ message: 'Password reset OTP sent to email' });
    } catch (error) {
        next(error);
    }
};

// Reset Password
export const resetPassword = async (request, response, next) => {
    const { email, otp, newPassword } = request.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        if (!user.otp) {
            return response.status(400).json({ message: 'Invalid Request or no previous Forgot Password request exists' });
        }

        // Verifying OTP
        const otpMatch = await bcrypt.compare(otp, user.otp);
        if (!otpMatch || new Date() > user.otpExpiration) {
            return response.status(400).json({ message: 'Invalid or Expired OTP' });
        }

        // Hashing new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.otp = undefined;
        user.otpExpiration = undefined;
        await user.save();
        response.status(200).json({ message: 'Password has been reset' });

    } catch (error) {
        next(error);
    }
};
