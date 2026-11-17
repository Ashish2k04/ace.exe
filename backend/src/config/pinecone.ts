import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "./config.js";

const pinecone = new Pinecone({
    apiKey: config.PINECONE_API_KEY
});

export const echoIndex = pinecone.index(config.PINECONE_INDEX_NAME);
 