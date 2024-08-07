import express from 'express';
import { newUser,loginUser,Userprofile,validateSignup,validateLogin } from '../controllers/authController.js';


const router=express.Router();

router.post('/signup',validateSignup,newUser);
router.post('/login',validateLogin,loginUser);
router.get('/profile/:id',Userprofile);


export default router;