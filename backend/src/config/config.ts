import "dotenv/config";

if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URI is missing in environment variables.");
}

type Config = {
  readonly PORT: number;
  readonly MONGODB_URI: string;
  readonly environment?: string;
};

export const config: Config = {
    PORT: Number(process.env.PORT) || 8000,
    MONGODB_URI: String(process.env.MONGODB_URI),
    environment: process.env.NODE_ENV || "development",
}

