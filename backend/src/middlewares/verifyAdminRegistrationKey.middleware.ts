import {config} from "../config/config.js";
import type {Request, Response, NextFunction} from "express";

export const verifyAdminRegistrationKey = (req: Request, res: Response, next: NextFunction) => {
 
       const registrationKey = req.headers["x-admin-registration-key"];

       if(!registrationKey) {
         return res.status(400).json({
            message: "Registration key is missing from the request headers.",
            success: false
         })
       }

       if(registrationKey !== config.ADMIN_REGISTRATION_SECRET_KEY){
         return res.status(403).json({
            message: "Invalid registration key provided in the request headers.",
            success: false
         })
       }

       next();
}