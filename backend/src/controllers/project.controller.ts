import type {Request, Response, NextFunction} from 'express';

async function createProject(req: Request, res: Response, next: NextFunction){
     try{
        const {title, description, liveUrl, githubUrl, thumbnail, skills} = req.body;
         
        if(!title || !description || !thumbnail || !Array.isArray(skills) || skills.length === 0){
            return res.status(400).json({
                message: "Title, description, thumbnail and at least one skill are required.",
                success: false
            });
        }

        

     }
     catch(error){
        next(error);
     }
};

export {
    createProject
}