import type { Request, Response, NextFunction } from "express";
import { userQuery } from "../services/embedding.service.js";

async function chatWithEcho(req: Request, res: Response, next: NextFunction){
    try{
       const { question } = req.body;

       if (!question || typeof question !== "string") {
          return res.status(400).json({
          message: "A valid question is required."
        });
      }

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
