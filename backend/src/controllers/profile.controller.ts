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

        const profileExists = await Profile.findOne();

        if(profileExists){
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

         return res.status(201).json({
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

async function getProfile(req: Request, res: Response, next: NextFunction){
       try{
           const user = await Profile.findOne();

           if(!user){
            return res.status(404).json({
                message: "No user profile found.",
                success: false
            })
           }

           return res.status(200).json({
               message: "User profile fetched successfully.",
               success: true,
               user: {
                 name: user.name,
                 profileImage: user.profileImage,
                 about: user.about,
                 resume: user.resume
               }
           })
       }
       catch(error){
           next(error);
       }
}

async function updateProfile(req: Request, res: Response, next: NextFunction){
     try{
        const {name, profileImage, about, resume} = req.body;

        if(!name && !profileImage && !about && !resume){
            return res.status(400).json({
                message: "At least one field is required to update.",
                success: false
            });
        }

        const profile = await Profile.findOneAndUpdate(
            {},
            {
                name,
                profileImage,
                about,
                resume
            },
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            message: "Field updated successfully.",
            success: true,
            user: {
              name: profile?.name,
              profileImage: profile?.profileImage,
              about: profile?.about,
              resume: profile?.resume
            }
        });
     }
     catch(error){
        next(error);
     }
}

export{
    createProfile,
    getProfile,
    updateProfile
}