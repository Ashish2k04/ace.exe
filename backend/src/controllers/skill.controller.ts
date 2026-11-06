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

       const UpperCaseName = name.toUpperCase();

       const skillExists = await Skill.findOne({name: UpperCaseName});

       if(skillExists){
        return res.status(409).json({
            message: "Skill already exists.",
            success: false
        })
       }

       const skill = await Skill.create({name: UpperCaseName});

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

async function getSkills(req: Request, res: Response, next: NextFunction){
    try{
        const skills = await Skill.find().sort({name: 1});

        return res.status(200).json({
            message: "All skills fetched.",
            success: true,
            skills
        })
    }
    catch(error){
        next(error);
    }
}

export {
    createSkill,
    getSkills
}