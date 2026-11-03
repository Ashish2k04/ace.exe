import { config } from "../config/config.js";

export function errorHandler(err: any, req: any, res: any, next: any) {

    const response: { message: string; success: boolean; stack?: string } = {
        message: "Internal Server Error",
        success: false,
    }

    if(config.environment === "development"){
        response.stack = err.stack;
    }

    return res.status(err.status || 500).json(response);
  
}