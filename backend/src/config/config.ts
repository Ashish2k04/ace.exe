import "dotenv/config";

type Config = {
  readonly PORT: number;
  readonly MONGODB_URI: string;
};

export const config: Config = {
    PORT: Number(process.env.PORT) || 8000,
    MONGODB_URI: String(process.env.MONGODB_URI),
}