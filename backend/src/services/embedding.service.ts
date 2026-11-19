import { config } from "../config/config.js";
import { Pinecone } from '@pinecone-database/pinecone';
import { CohereEmbeddings } from "@langchain/cohere";

const embeddings = new CohereEmbeddings({
   apiKey: config.COHERE_API_KEY,
   model: "embed-english-v3.0"
})

const pc = new Pinecone({
    apiKey: config.PINECONE_API_KEY
})

const index = pc.index(config.PINECONE_INDEX_NAME);

export async function userQuery(question: string) {
   const queryEmbedding = await embeddings.embedQuery(question);

   const result = await index.query({
     vector: queryEmbedding,
     topK: 10,
     includeMetadata: true
   })
   
   return result;
}


