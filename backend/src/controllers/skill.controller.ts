import type {Request, Response, NextFunction} from "express";
import Skill from "../models/skill.model.js";

async function createSkill(req: Request, res: Response, next: NextFunction){
    try{
       const {name} = req.body;

       if(typeof name !== "string" || !name.trim()){
        return res.status(400).json({
            message: "Input cannot be empty, add atleast one skill.",
            success: false
        })
       }

       const skillExists = await Skill.findOne({name});

       if(skillExists){
        return res.status(409).json({
            message: "Skill already exists.",
            success: false
        })
       }

       const skill = await Skill.create({name});

       return res.status(201).json({
           message: "Skill created successfully.",
           success: true,
           skill
       });
    }
    catch(error){
        next(error);
    }
}

export {
    createSkill
}