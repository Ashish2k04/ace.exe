import { Router } from "express";
import {createSkill, getSkill} from "../controllers/skill.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const skillRouter = Router();

skillRouter.post("/createSkill", authMiddleware, createSkill);
skillRouter.get("/getSkill", getSkill);

export default skillRouter;