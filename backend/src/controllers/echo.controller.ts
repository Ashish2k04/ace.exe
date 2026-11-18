import type { Request, Response, NextFunction } from "express";
import { userQuery } from "../services/embedding.service.js";

async function chatWithEcho(req: Request, res: Response, next: NextFunction){
    try{
       const { question } = req.body;

       const response = await userQuery(question);

       console.log(response);

       return res.json({
        response
       })
    }
    catch(error){
        next(error);
    }
}

export {
    chatWithEcho  
}
