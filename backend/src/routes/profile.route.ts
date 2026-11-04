import { Router } from "express";
import { createProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const profileRouter = Router();

profileRouter.post("/createProfile", authMiddleware, createProfile);

export default profileRouter;