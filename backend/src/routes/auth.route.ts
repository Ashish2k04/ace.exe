import { Router } from 'express';
import { register, login, resetPassword, logout } from '../controllers/auth.controller.js';
import { validateUserCredentials } from '../validations/auth.validation.js';
import { rateLimitMiddleware } from '../middlewares/rateLimit.middleware.js';
import { verifyAdminRegistrationKey } from '../middlewares/verifyAdminRegistrationKey.middleware.js';

const authRouter = Router();

authRouter.post("/register", rateLimitMiddleware(3), verifyAdminRegistrationKey, validateUserCredentials, register);
authRouter.post("/login", rateLimitMiddleware(5), validateUserCredentials, login);
authRouter.post("/resetPassword", resetPassword);
authRouter.post("/logout", logout);

export default authRouter;