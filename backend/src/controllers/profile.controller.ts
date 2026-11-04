import type { Request, Response, NextFunction } from "express";
import Profile from "../models/profile.model.js";


async function createProfile(req: Request, res: Response, next: NextFunction){
      const {name, profileImage, about, resume} = req.body;

      try{
         return res.json({
            name,
            profileImage,
            about,
            resume
         })
      }
      catch(error){
        next(error);
      }
}

export{
    createProfile 
}