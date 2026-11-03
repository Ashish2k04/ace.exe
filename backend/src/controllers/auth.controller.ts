import Admin from "../models/admin.model.js";
import type { Request, Response, NextFunction } from "express";

async function login(req: Request, res: Response, next: NextFunction) {

    const {email, password} = req.body;

    try{
      const user = await Admin.findOne({email}).select("+password");

      if(!user){
          return res.status(404).json({
             message: "No user found with this email address.",
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

      return res.status(200).json({
        message: "User login successfull",
        success: true,
        user: {
            email: user.email
        }
      })
     
    }
    catch(error: unknown){
        next(error);
    }
}

export {
    login
}