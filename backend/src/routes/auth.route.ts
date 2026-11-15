import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { validateUserCredentials } from '../validations/auth.validation.js';
import { rateLimitMiddleware } from '../middlewares/rateLimit.middleware.js';

const authRouter = Router();

authRouter.post("/login", rateLimitMiddleware(5), validateUserCredentials, login);
authRouter.post("/logout", logout);

export default authRouter;