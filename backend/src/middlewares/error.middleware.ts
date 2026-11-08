import { config } from "../config/config.js";
import type { ErrorRequestHandler } from "express";
import multer from "multer";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    const response: { message: string; success: boolean; stack?: string } = {
        message: "Internal Server Error",
        success: false,
    };

    let status = err.status || 500;

    if (err instanceof multer.MulterError) {
        status = 400;

        if (err.code === "LIMIT_FILE_SIZE") {
            response.message = "File size cannot exceed 5 MB.";
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            response.message = "Unexpected file field.";
        } else {
            response.message = err.message;
        }
    } else if (
        [
            "Only image files are allowed for profile image.",
            "Only PDF files are allowed for resume.",
            "Unexpected file field."
        ].includes(err.message)
    ) {
        status = 400;
        response.message = err.message;
    } else {
        response.message = err.message || response.message;
    }

    if (config.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return res.status(status).json(response);
};
