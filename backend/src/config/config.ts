import "dotenv/config";

if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URI is missing in environment variables.");
}

if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("IMAGEKIT_PRIVATE_KEY is missing in environment variables.");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is missing in environment variables.");
}

if (!process.env.ADMIN_REGISTRATION_SECRET_KEY) {
    throw new Error("ADMIN_REGISTRATION_SECRET_KEY is missing in environment variables.");
}


if (!process.env.PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY is missing in environment variables.");
}

if (!process.env.PINECONE_INDEX_NAME) {
    throw new Error("PINECONE_INDEX_NAME is missing in environment variables.");
}

if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in environment variables.");
}

if (!process.env.COHERE_API_KEY) {
    throw new Error("COHERE_API_KEY is missing in environment variables.");
}

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing in environment variables.");
}

type Config = {
  readonly PORT: number;
  readonly MONGODB_URI: string;
  readonly IMAGEKIT_PRIVATE_KEY: string;
  readonly JWT_SECRET: string;
  readonly ADMIN_REGISTRATION_SECRET_KEY: string;
  readonly NODE_ENV?: string;
  readonly PINECONE_API_KEY: string;
  readonly PINECONE_INDEX_NAME: string;
  readonly GROQ_API_KEY: string;
  readonly COHERE_API_KEY: string;
  readonly GEMINI_API_KEY: string;
};

export const config: Config = {
    PORT: Number(process.env.PORT) || 8000,
    MONGODB_URI: String(process.env.MONGODB_URI),
    IMAGEKIT_PRIVATE_KEY: String(process.env.IMAGEKIT_PRIVATE_KEY),
    JWT_SECRET: String(process.env.JWT_SECRET),
    ADMIN_REGISTRATION_SECRET_KEY: String(process.env.ADMIN_REGISTRATION_SECRET_KEY),
    NODE_ENV: process.env.NODE_ENV || "development",
    PINECONE_API_KEY: String(process.env.PINECONE_API_KEY),
    PINECONE_INDEX_NAME: String(process.env.PINECONE_INDEX_NAME),
    GROQ_API_KEY: String(process.env.GROQ_API_KEY),
    COHERE_API_KEY: String(process.env.COHERE_API_KEY),
    GEMINI_API_KEY: String(process.env.GEMINI_API_KEY)
}