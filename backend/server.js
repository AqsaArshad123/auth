import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import {errorHandler} from './middleware/errorHandler.js';

dotenv.config();

const DB = process.env.MONGO_URI;

const app=express();

app.use(express.json());

mongoose.connect(DB)
    .then(() => {
        console.log("DB Connection Successful!");
    })
    .catch((error) => {
        console.error('Error in DB Connection:', error.message);
        process.exit(1);
    });


app.use('/api',authRoutes);

//Error Handler
app.use(errorHandler);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

