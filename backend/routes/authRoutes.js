import express from 'express';
import { newUser,loginUser,Userprofile,validateSignup,validateLogin, forgetPassword, resetPassword ,validateNewPassword } from '../controllers/authController.js';


const router=express.Router();

router.post('/signup',validateSignup,newUser);
router.post('/login',validateLogin,loginUser);
router.get('/profile/:id',Userprofile);
router.post('/forgot-password', forgetPassword);
router.put('/reset-password', validateNewPassword, resetPassword);

export default router;