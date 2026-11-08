import type { Request, Response, NextFunction } from "express";
import Profile from "../models/profile.model.js";
import Admin from "../models/admin.model.js";
import imagekitUpload, { deleteImage } from "../services/imagekit.service.js"

async function createProfile(req: Request, res: Response, next: NextFunction){
      const {name, about} = req.body;

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

       const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
       };

       const profileImg = files.profileImg?.[0];
       const resumeFile = files.resume?.[0];

       if (!profileImg || !resumeFile) {
        return res.status(400).json({
           message: "Profile image and resume are required.",
           success: false
        });
       }

        const uploadImg = await imagekitUpload(profileImg.buffer, "admin_pfp", "/ace_exe/admin");

        const uploadResume = await imagekitUpload(resumeFile.buffer, "admin_resume", "/ace_exe/admin");

        if (!uploadImg.url || !uploadImg.fileId) {
              throw new Error("ImageKit failed to return image URL or image Id.");
        }

        if (!uploadResume.url || !uploadResume.fileId) {
              throw new Error("ImageKit failed to return resume URL or resume Id.");
        }

        const profile = await Profile.create({
            name,
            profileImage: uploadImg.url,
            profileImageFileId: uploadImg.fileId,
            about,
            resume: uploadResume.url,
            resumeFileId: uploadResume.fileId
        });

         return res.status(201).json({
            name: profile.name,
            profileImage: profile.profileImage,
            profileImageFileId: profile.profileImageFileId,
            about: profile.about,
            resume: profile.resume,
            resumeFileId: profile.resumeFileId
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
        const {name, about} = req.body;

        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        } | undefined;

        const profileImg = files?.profileImg?.[0];
        const resumeFile = files?.resume?.[0];

        if(!name && !about && !profileImg && !resumeFile){
            return res.status(400).json({
                message: "At least one field is required to update.",
                success: false
            });
        }

        const oldProfile = await Profile.findOne();

        if(!oldProfile){
            return res.status(404).json({
                message: "Profile not found, You must create a profile first.",
                success: false
            });
        }

        const updateData: any = {};

        if(name) updateData.name = name;
        if(about) updateData.about = about;

        if(profileImg){
            const uploadImg = await imagekitUpload(profileImg.buffer, "admin_pfp");

            if(!uploadImg.url || !uploadImg.fileId){
                throw new Error("ImageKit failed to return image URL or image Id.");
            }

            updateData.profileImage = uploadImg.url;
            updateData.profileImageFileId = uploadImg.fileId;
        }

        if(resumeFile){
            const uploadResume = await imagekitUpload(resumeFile.buffer, "admin_resume");

            if(!uploadResume.url || !uploadResume.fileId){
                throw new Error("ImageKit failed to return resume URL or resume Id.");
            }

            updateData.resume = uploadResume.url;
            updateData.resumeFileId = uploadResume.fileId;
        }

        const profile = await Profile.findOneAndUpdate(
            {},
            updateData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if(!profile){
            return res.status(404).json({
                message: "Profile not found, You must create a profile first."
                ,success: false
            });
        }

        if(profileImg && oldProfile.profileImageFileId){
            await deleteImage(oldProfile.profileImageFileId);
        }

        if(resumeFile && oldProfile.resumeFileId){
            await deleteImage(oldProfile.resumeFileId);
        }

        return res.status(200).json({
            message: "Field updated successfully.",
            success: true,
            user: {
                name: profile.name,
                profileImage: profile.profileImage,
                about: profile.about,
                resume: profile.resume
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