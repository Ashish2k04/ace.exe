import { Router } from "express";
import {createSkill} from "../controllers/skill.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const skillRouter = Router();

skillRouter.post("/createSkill", authMiddleware, createSkill);

export default skillRouter;