import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// make sure path is correct
import jwt from 'jsonwebtoken';
const router: Router = Router(); // This correctly creates an Express Router instance

// should log 'function'


import dotenv from 'dotenv';
import { User } from '../db';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User created successfully',
            userId: newUser._id,
            email: newUser.email,
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/signin", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.json({
                message: "User not found",
            })
            return
        }

        // ✅ At this point, TypeScript knows `user` is not null
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET as string
        );

        res.status(200).json({
            message: "Signin successful",
            userId: user._id,
            email: user.email,
            token
        });

    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router; // This correctly exports the router instance