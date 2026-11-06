import { Router } from "express";
import {createSkill, getSkills} from "../controllers/skill.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const skillRouter = Router();

skillRouter.post("/createSkill", authMiddleware, createSkill);
skillRouter.get("/getSkills", getSkills);

export default skillRouter;