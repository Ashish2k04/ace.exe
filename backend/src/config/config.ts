import "dotenv/config";

type Config = {
  readonly PORT: number;
};

export const config: Config = {
    PORT: Number(process.env.PORT) || 8000,
}