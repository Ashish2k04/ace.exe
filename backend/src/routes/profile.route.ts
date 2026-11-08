import { Router } from "express";
import { createProfile, getProfile, updateProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const profileRouter = Router();

profileRouter.post("/createProfile", authMiddleware, upload.single("profileImg"), createProfile);
profileRouter.get("/getProfile", getProfile);
profileRouter.patch("/updateProfile", authMiddleware, updateProfile);

export default profileRouter;