import type {Request, Response, NextFunction} from 'express';

async function createProject(req: Request, res: Response, next: NextFunction){
     try{
        const {title, description, liveUrl, githubUrl, thumbnail, skills} = req.body;
         
        if(!title || !description || !thumbnail || !skills || !liveUrl || !githubUrl){
            return res.status(400).json({
                message: "All fields are required.",
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