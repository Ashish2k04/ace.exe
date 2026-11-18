import type { Request, Response, NextFunction } from "express";
import { userQuery } from "../services/embedding.service.js";
import { askAi } from "../services/llm.service.js";

async function chatWithEcho(req: Request, res: Response, next: NextFunction){
    try{
       const { question } = req.body;

       if (!question || typeof question !== "string" || !question.trim()) {
          return res.status(400).json({
          message: "A valid question is required."
        });
      }

       const embeddingService = await userQuery(question);

       console.log(embeddingService);

       const aiResponse = await askAi({
           userQuestion: question,
           retrievedChunks: embeddingService
        });

       console.log(aiResponse);

       return res.json({
         aiResponse
       })
    }
    catch(error){
        next(error);
    }
}

export {
    chatWithEcho  
}
