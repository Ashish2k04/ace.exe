import { Router } from "express";
import { createProfile, getProfile, updateProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const profileRouter = Router();

profileRouter.post("/createProfile", authMiddleware, upload.fields([{name: "profileImg", maxCount: 1}, {name: "resume", maxCount: 1}]), createProfile);
profileRouter.get("/getProfile", getProfile);
profileRouter.patch("/updateProfile", authMiddleware, upload.fields([{name: "profileImg", maxCount: 1}, {name: "resume", maxCount: 1}]) ,updateProfile);

export default profileRouter;