import { Router } from "express";
import {createSkill, getSkills, deleteSkill} from "../controllers/skill.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const skillRouter = Router();

skillRouter.post("/createSkill", authMiddleware, createSkill);
skillRouter.get("/getSkills", getSkills);
skillRouter.delete("/deleteSkill/:id", authMiddleware, deleteSkill);

export default skillRouter;