import {config} from "../config/config.js"
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

     if (!token) {
            return res.status(401).json({ 
                message: "Unauthorized user." ,
                success: false,
                error: "No token provided"
            });
        }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
          return res.status(401).json({
             message: "Invalid or expired token.",
             success: false
          });
    }
}

export default authMiddleware;