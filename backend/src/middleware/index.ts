import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Make sure your .env is loaded in the main entry file, or do it here:
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface AuthenticatedRequest extends Request {
    userId?: string;
}




export function userMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Incoming headers:", req.headers);
    console.log(token)
    if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET as string) as { userId: string };
        console.log(decoded)
        req.userId = decoded.userId; // ✅ Correct field name
        console.log(`this is the verify ${decoded.userId}`);
        next();
    } catch (err) {
        res.status(403).json({ message: "You are not signed in" });
    }
}
