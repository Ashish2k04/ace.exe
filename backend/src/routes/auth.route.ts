import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { validateLogin } from '../validations/auth.validation.js';
import { rateLimitMiddleware } from '../middlewares/rateLimit.middleware.js';

const authRouter = Router();

authRouter.post("/login", rateLimitMiddleware, validateLogin, login);

export default authRouter;