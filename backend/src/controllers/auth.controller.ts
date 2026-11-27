import { config } from "../config/config.js";
import type { HydratedDocument } from "mongoose";
import Admin from "../models/admin.model.js";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user: HydratedDocument<{ email: string; }>, res: Response, message: string) {
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

async function register(req: Request, res: Response, next: NextFunction) {
    try{
      const {email, password} = req.body;
       
      const userExist = await Admin.findOne();

      if(userExist){
        return res.status(409).json({
          message: "Delete existing admin credentials from DB to make new one.",
          success: false
        })
      }

      const user = await Admin.create({
        email: email,
        password: password
      });

      return res.status(201).json({
        message: "User created successfully!",
        success: true,
        user: {
          email: user.email
        }
      })
    }
    catch(error: unknown) {
      next(error);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try{
      const {email, password} = req.body;

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

async function updateEmail(req: Request, res: Response, next: NextFunction) {
      try{
          const { email } = req.body;

          const userId = (req as any).user.id;

          if(!email){
            return res.status(400).json({
              message: "Email Should Not Be Empty.",
              success: false
            })
          }

          const getUser = await Admin.findById(userId);

          if(getUser?.email === email) {
            return res.status(409).json({
              message: "This email is already available in Database.",
              success: false
            })
          }

          if(!getUser){
            return res.status(404).json({
              message: "Cannot find the user by id.",
              success: false
            })
          }

          getUser.email = email;
          await getUser.save();

          return res.status(200).json({
              message: "Email changed successfully.",
              success: true,
          })
      }
      catch(error){
        next(error);
      }
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
   try{
      const {oldPassword, newPassword} = req.body;

      const userId = (req as any).user.id;

      if(!oldPassword || !newPassword){
        return res.status(401).json({
          message: "Old and New Password Field Should Not Be Empty.",
          success: false
        })
      }

      const getUser = await Admin.findById(userId).select("+password");

      if(!getUser){
        return res.status(404).json({
          message: "Password error.",
          success: false
        })
      }

      const userPassword = await (getUser as typeof getUser & {
        comparePassword(oldPassword: string): Promise<boolean>;
      }).comparePassword(oldPassword);

      if(!userPassword){
        return res.status(401).json({
            message: "Your old password is invalid.",
            success: false
        })
      }
      
      getUser.password = newPassword;
      await getUser.save();

      return res.status(200).json({
        message: "Password changed successfully.",
        success: true,
      })

   }
   catch(error){
    next(error)
   }
}

async function logout(req: Request, res: Response, next: NextFunction) {
    try{
       res.clearCookie("token", {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict"
       });

       return res.status(200).json({
        message: "User logged out successfully.",
        success: true
       })
    }
    catch(error: unknown){
      next(error);
    }
}

export {
    register,
    login,
    updateEmail,
    resetPassword,
    logout
}