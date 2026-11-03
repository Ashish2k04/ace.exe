import { config } from "../config/config.js";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    const response: { message: string; success: boolean; stack?: string } = {
        message: "Internal Server Error",
        success: false,
    }

    if(config.NODE_ENV === "development"){
        response.stack = err.stack;
    }

    return res.status(err.status || 500).json(response);
  
}