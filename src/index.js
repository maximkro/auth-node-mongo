import express from 'express';
import mongoose from 'mongoose';
import authRouter from './api/routes/authRouter.js'
const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use('/auth', authRouter);


const start = async () => {
    try {
        await mongoose.connect("");
        app.listen(PORT, () => (console.log('server Started on Port 5000')))
    } catch (e) {
        console.log(e);
    }
}

start();
