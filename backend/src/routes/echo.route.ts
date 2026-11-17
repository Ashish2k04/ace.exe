import { Router } from "express";
import { chatWithEcho } from "../controllers/echo.controller.js";

const echoRouter = Router();

echoRouter.post("/chat", chatWithEcho);

export default echoRouter;