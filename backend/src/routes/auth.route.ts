import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { validateLogin } from '../validations/auth.validation.js';
import { rateLimitMiddleware } from '../middlewares/rateLimit.middleware.js';

const authRouter = Router();

authRouter.post("/login", rateLimitMiddleware(5), validateLogin, login);
authRouter.post("/logout", rateLimitMiddleware(3), logout);

export default authRouter;