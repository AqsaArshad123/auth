import express from 'express';
import { newUser,loginUser,Userprofile, forgetPassword, resetPassword  } from '../controllers/authController.js';
import { validateSignup,validateLogin,validateNewPassword } from '../validators/authValidators.js';
import {authMiddleware} from '../middleware/authMiddleware.js';


const router=express.Router();

router.post('/signup',validateSignup,newUser);
router.post('/login',validateLogin,loginUser);
router.get('/profile/:id',authMiddleware,Userprofile);
router.post('/forgot-password', forgetPassword);
router.put('/reset-password', validateNewPassword, resetPassword);

export default router;