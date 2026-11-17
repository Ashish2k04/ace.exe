import type { Request, Response, NextFunction } from "express";


async function chatWithEcho(req: Request, res: Response, next: NextFunction){
    try{
       const { question } = req.body;

       console.log(question);

       return res.json({
        question
       })
    }
    catch(error){
        next(error);
    }
}

export {
    chatWithEcho  
}
