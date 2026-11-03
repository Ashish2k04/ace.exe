import {Router} from 'express';
import { login } from '../controllers/auth.controller.js';
import { validateLogin } from '../validations/auth.validation.js';

const authRouter = Router();

authRouter.post("/login", validateLogin, login);

export default authRouter;