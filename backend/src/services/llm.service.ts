import type { QueryResponse, RecordMetadata } from "@pinecone-database/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/config.js";

interface AskAiInput {
    userQuestion: string;
    retrievedChunks: QueryResponse<RecordMetadata>;
}

const google = new ChatGoogleGenerativeAI({
    apiKey: config.GEMINI_API_KEY,
    model: "gemini-3.5-flash-lite",
});

export async function askAi({ userQuestion, retrievedChunks }: AskAiInput) {

    const context = retrievedChunks.matches
        .map((match) => match.metadata?.chunk_text)
        .filter((text): text is string => typeof text === "string")
        .join("\n\n");

    const response = await google.invoke([
        {
            role: "system",
            content: `You are Echo, an AI assistant representing Ashish.

            Answer the user's question using the provided context.
            If the context does not contain the answer, clearly say you don't have that information.
            Do not invent facts.`,
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
