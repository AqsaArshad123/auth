import express from 'express';
import { signup,login,me, forgetPassword, resetPassword } from '../controllers/auth.js';
import { validateSignup,validateLogin,validateNewPassword,validateRequest} from '../middleware/validators/auth.js';
import {authMiddleware} from '../middleware/auth.js';

const router=express.Router();

router.post('/signup',validateSignup,validateRequest,signup);
router.post('/login',validateLogin,validateRequest,login);
router.get('/me', authMiddleware, me);
router.post('/forgot-password', forgetPassword);
router.put('/reset-password', validateNewPassword,validateRequest, resetPassword);

export default router;