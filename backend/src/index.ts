import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/user'; // ✅ Correct import
import chargesRouter from './routes/charger';
import mongoose from 'mongoose';
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Example using Express

app.use(cors({
    origin: 'http://localhost:5173', // or your frontend origin
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

mongoose
    .connect(process.env.MONGO_URL || '', {

    })
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });



app.use('/auth/v1', usersRouter); // ✅ Correct usage — passing a Router, not a function
app.use('/charges', chargesRouter);




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});