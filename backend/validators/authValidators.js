import {body} from 'express-validator';


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
