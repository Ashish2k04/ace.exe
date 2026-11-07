import type {Request, Response, NextFunction} from 'express';
import Skill from '../models/skill.model.js';
import mongoose from 'mongoose';

async function createProject(req: Request, res: Response, next: NextFunction){
     try{
        const {title, description, liveUrl, githubUrl, thumbnail, skills} = req.body;
         
        if(!title || !description || !thumbnail || !Array.isArray(skills) || skills.length === 0){
            return res.status(400).json({
                message: "Title, description, thumbnail and at least one skill are required.",
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

     }
     catch(error){
        next(error);
     }
};

export {
    createProject
}