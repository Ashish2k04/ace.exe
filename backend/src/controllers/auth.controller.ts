import { config } from "../config/config.js";
import type { HydratedDocument } from "mongoose";
import Admin from "../models/admin.model.js";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user: HydratedDocument<{ email: string; }>, res: Response, message: string){
      const token = jwt.sign({id: user._id}, config.JWT_SECRET, {expiresIn: "1d"});

      res.cookie("token", token, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        message: message,
        success: true,
        user: {
          email: user.email
        }
      })
}

async function login(req: Request, res: Response, next: NextFunction) {

    const {email, password} = req.body;

    try{
      const user = await Admin.findOne({email}).select("+password");

      if(!user){
          return res.status(401).json({
             message: "Invalid credentials.",
             success: false,
        })
      }

      const userPassword = await (user as typeof user & {
        comparePassword(password: string): Promise<boolean>;
      }).comparePassword(password);

      if(!userPassword){
        return res.status(401).json({
            message: "Invalid credentials.",
            success: false
        })
      }

      await sendTokenResponse(user, res, "User login successful.");
      
    }
    catch(error: unknown){
        next(error);
    }
}

async function logout(req: Request, res: Response, next: NextFunction){
    try{
       
    }
    catch(error: unknown){
      next(error);
    }
}

export {
    login,
    logout
}