import { config } from "../config/config.js";
import type { Document } from "mongoose";
import Admin from "../models/admin.model.js";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user: Document, res: Response, message: string){
      const token = jwt.sign({id: user._id}, config.JWT_SECRET, {expiresIn: "1d"});

      res.cookie("token", token);

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
          return res.status(404).json({
             message: "Invalid credentials.",
             success: false,
        })
      }

      const userPassword = await (user as typeof user & {
        comparePassword(password: string): Promise<boolean>;
      }).comparePassword(password);

      if(!userPassword){
        return res.status(400).json({
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

export {
    login
}