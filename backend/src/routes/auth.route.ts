import { Router } from 'express';
import { register, login, updateEmail, resetPassword, logout } from '../controllers/auth.controller.js';
import { validateUserCredentials, validateEmail } from '../validations/auth.validation.js';
import { rateLimitMiddleware } from '../middlewares/rateLimit.middleware.js';
import { verifyAdminRegistrationKey } from '../middlewares/verifyAdminRegistrationKey.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js'

const authRouter = Router();

authRouter.post("/register", rateLimitMiddleware(3), verifyAdminRegistrationKey, validateUserCredentials, register);
authRouter.post("/login", rateLimitMiddleware(5), validateUserCredentials, login);
authRouter.patch("/updateEmail", validateEmail, authMiddleware, updateEmail);
authRouter.patch("/resetPassword", authMiddleware, resetPassword);
authRouter.post("/logout", logout);

export default authRouter;