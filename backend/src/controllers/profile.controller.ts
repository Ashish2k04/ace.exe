import type { Request, Response, NextFunction } from "express";
import Profile from "../models/profile.model.js";
import Admin from "../models/admin.model.js";

async function createProfile(req: Request, res: Response, next: NextFunction){
      const {name, profileImage, about, resume} = req.body;

      try{
        const userId = (req as any).user.id;

        const user = await Admin.findById(userId);

        if(!user){
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        const profileExists = await Profile.find();

        if(profileExists.length > 0){
            return res.status(409).json({
                message: "Profile already exists, so now you can only update it.",
                success: false
            });
        }

        const profile = await Profile.create({
            name,
            profileImage,
            about,
            resume
        });

         return res.json({
            name: profile.name,
            profileImage: profile.profileImage,
            about: profile.about,
            resume: profile.resume
         })
      }
      catch(error){
        next(error);
      }
}

export{
    createProfile 
}