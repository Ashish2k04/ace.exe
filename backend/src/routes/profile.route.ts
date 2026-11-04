import { Router } from "express";
import { createProfile, getProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const profileRouter = Router();

profileRouter.post("/createProfile", authMiddleware, createProfile);
profileRouter.get("/getProfile", authMiddleware, getProfile);

export default profileRouter;