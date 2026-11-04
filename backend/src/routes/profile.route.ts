import { Router } from "express";
import { createProfile } from "../controllers/profile.controller.js";

const profileRouter = Router();

profileRouter.post("/createProfile", createProfile);

export default profileRouter;