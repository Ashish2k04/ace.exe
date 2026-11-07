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

type Config = {
  readonly PORT: number;
  readonly MONGODB_URI: string;
  readonly IMAGEKIT_PRIVATE_KEY: string;
  readonly JWT_SECRET: string;
  readonly NODE_ENV?: string;
};

export const config: Config = {
    PORT: Number(process.env.PORT) || 8000,
    MONGODB_URI: String(process.env.MONGODB_URI),
    IMAGEKIT_PRIVATE_KEY: String(process.env.IMAGEKIT_PRIVATE_KEY),
    JWT_SECRET: String(process.env.JWT_SECRET),
    NODE_ENV: process.env.NODE_ENV || "development",
}

