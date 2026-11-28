import { config } from "../config/config.js";
import { ChatCohere } from "@langchain/cohere";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { QUESTION_REWRITER_PROMPT } from "../prompts/echo.prompt.js";


const cohere = new ChatCohere({
    apiKey: config.COHERE_QUESTION_REWRITER_API_KEY,
    model: "command-r-plus-08-2024"
});

export async function rewriteQuestion (question: string) {
      const response = await cohere.invoke([
        new SystemMessage(QUESTION_REWRITER_PROMPT),
        new HumanMessage(question)
      ]);

      console.log("Response from question-file", response.content);
      return response.content
}