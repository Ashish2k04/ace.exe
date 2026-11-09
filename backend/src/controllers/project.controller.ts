import type {Request, Response, NextFunction} from 'express';
import Skill from '../models/skill.model.js';
import mongoose from 'mongoose';
import Project from '../models/project.model.js';
import imagekitUpload, {deleteImage} from '../services/imagekit.service.js';

async function createProject(req: Request, res: Response, next: NextFunction){
     try{
        const {title, description, liveUrl, githubUrl} = req.body;
        const skills = JSON.parse(req.body.skills || "[]");
         
        if(!title || !description || !Array.isArray(skills) || skills.length === 0){
            return res.status(400).json({
                message: "Title, description and at least one skill are required.",
                success: false
            });
        }

        for (const id of skills) {

           if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message: "Invalid skill ID.",
                success: false
            })
           };

           const skillExists = await Skill.findById(id);

           if(!skillExists){
            return res.status(404).json({
                message: "One or more skills not found.",
                success: false
            })
           }
        }

        if(!req.file){
            return res.status(400).json({
                message: "Thumbnail is required.",
                success: false
            })
        }

        const uploadThumbnail = await imagekitUpload(req.file.buffer, "project_thumbnail", "/ace_exe/projects");

         if (!uploadThumbnail.url || !uploadThumbnail.fileId) {
              throw new Error("ImageKit failed to return image URL or image Id.");
        }

        const project = await Project.create({
            title,
            description,
            liveUrl,
            githubUrl,
            thumbnail: uploadThumbnail.url,
            thumbnailFileId: uploadThumbnail.fileId,
            skills
        });

        return res.status(201).json({
            message: "Project created successfully.",
            success: true,
            project
        });

     }
     catch(error){
        next(error);
     }
};

async function getProject(req: Request, res: Response, next: NextFunction){
    try{
        const projects = await Project.find().populate("skills", "name");

        return res.status(200).json({
            message: "Project fetched successfully.",
            success: true,
            projects
        })
    }
    catch(error){
        next(error);
    }
}

async function deleteProject(req: Request, res: Response, next: NextFunction){
    try{
       const projectId = req.params.id;

       if(!projectId){
        return res.status(400).json({
            message: "Field cannot be empty.",
            success: false
        })
       }

       if(!mongoose.isValidObjectId(projectId)){
        return res.status(400).json({
            message: "Invalid project ID.",
            success: false
        })
       }

       const projectExists = await Project.findById(projectId);

       if(!projectExists){
        return res.status(404).json({
            message: "No project found with this ID.",
            success: false
        })
       }

       await deleteImage(projectExists.thumbnailFileId);

       await Project.findByIdAndDelete(projectId);

       return res.status(200).json({
        message: "Project deleted successfully.",
        success: true
       });

    }
    catch(error){
        next(error);
    }
}

export {
    createProject,
    getProject,
    deleteProject
}