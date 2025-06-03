import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/user';
import chargesRouter from './routes/charger';
import mongoose from 'mongoose';
import cors from 'cors';
import type { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'https://charger-apps-tlq9.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to MongoDB only once
let isConnected = false;
async function connectToMongo() {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URL || '');
        isConnected = true;
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
    }
}
connectToMongo();

app.use('/auth/v1', usersRouter);
app.use('/charges', chargesRouter);

// ✅ Export a function instead of calling app.listen()
export default function handler(req: VercelRequest, res: VercelResponse) {
    app(req as any, res as any);
}
