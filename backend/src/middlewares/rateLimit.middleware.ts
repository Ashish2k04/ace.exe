import {rateLimit} from "express-rate-limit";

export const rateLimitMiddleware = (maxReq = 2) => {
     return rateLimit({
        windowMs: 15 * 60 * 1000, 
        max: maxReq, 
        message: "Too many login requests, please try again after 15 minutes.",
        standardHeaders: true, 
        legacyHeaders: false, 
    });
}


