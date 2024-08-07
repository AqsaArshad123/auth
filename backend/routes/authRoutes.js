import express from 'express';
import { newUser,loginUser,Userprofile } from '../controllers/authController.js';


const router=express.Router();

router.post('/signup',newUser);
router.post('/login',loginUser);
router.get('/profile/:id',Userprofile);


export default router;