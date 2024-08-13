import express from 'express';
import { newUser,loginUser,Userprofile, forgetPassword, resetPassword  } from '../controllers/authController.js';
import { validateSignup,validateLogin,validateNewPassword,validateRequest} from '../middleware/authValidators.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/signup',validateSignup,validateRequest,newUser);
router.post('/login',validateLogin,validateRequest,loginUser);
router.get('/profile', authMiddleware, Userprofile);
router.post('/forgot-password', forgetPassword);
router.put('/reset-password', validateNewPassword,validateRequest, resetPassword);

export default router;