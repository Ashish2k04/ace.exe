import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProject } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.post("/createProject", authMiddleware, createProject);

export default projectRouter;