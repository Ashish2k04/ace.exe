import type { QueryResponse, RecordMetadata } from "@pinecone-database/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { config } from "../config/config.js";
import { ECHO_SYSTEM_PROMPT } from "../prompts/echo.prompt.js";

interface AskAiInput {
    userQuestion: string;
    retrievedChunks: QueryResponse<RecordMetadata>;
}

const gemini = new ChatGoogleGenerativeAI({
    apiKey: config.GEMINI_API_KEY,
    model: "gemini-3.5-flash-lite",
});

const groq = new ChatGroq({
    apiKey: config.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
});

const models = gemini.withFallbacks({
    fallbacks: [groq]
})

export async function askAi({ userQuestion, retrievedChunks }: AskAiInput) {

    const context = retrievedChunks.matches
        .map((match) => match.metadata?.chunk_text)
        .filter((text): text is string => typeof text === "string")
        .join("\n\n");

    const response = await models.invoke([
        {
            role: "system",
            content: ECHO_SYSTEM_PROMPT,
        },
        {
            role: "user",
            content: `Context:           
            ${context}
            Question:
            ${userQuestion}`,
        },
    ]);

    return response.content;
}
