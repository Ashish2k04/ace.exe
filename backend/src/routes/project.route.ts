import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProject, getProject } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.post("/createProject", authMiddleware, createProject);
projectRouter.get("/getProject", getProject);

export default projectRouter;