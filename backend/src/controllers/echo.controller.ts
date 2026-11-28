import type { Request, Response, NextFunction } from "express";
import { userQuery } from "../services/embedding.service.js";
import { askAi } from "../services/llm.service.js";
import { rewriteQuestion } from "../services/question-rewriter.service.js";

async function chatWithEcho(req: Request, res: Response, next: NextFunction) {
    try{
       const { question } = req.body;

       if (!question || typeof question !== "string" || !question.trim()) {
          return res.status(400).json({
          message: "A valid question is required."
        });
      }

      const rewrittenQuestion = await rewriteQuestion(question);

      const enhancedQuestion = typeof rewrittenQuestion === "string" ? rewrittenQuestion : question;

      console.log("Enhanced question from cohere: ", enhancedQuestion);

       const embeddingService = await userQuery(enhancedQuestion);

       const aiResponse = await askAi({
           userQuestion: question,
           retrievedChunks: embeddingService
        });

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
