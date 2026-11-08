import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProject, getProject, deleteProject } from "../controllers/project.controller.js";
import upload from "../middlewares/multer.middleware.js";

const projectRouter = Router();

projectRouter.post("/createProject", authMiddleware, upload.single("thumbnail"), createProject);
projectRouter.get("/getProject", getProject);
projectRouter.delete("/deleteProject/:id", authMiddleware, deleteProject);

export default projectRouter;