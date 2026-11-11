import express from 'express';
import type {Request, Response} from 'express';
import authRouter from './routes/auth.route.js';
import profileRouter from './routes/profile.route.js';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import {errorHandler} from './middlewares/error.middleware.js';
import skillRouter from './routes/skill.route.js';
import projectRouter from './routes/project.route.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/user", profileRouter);
app.use("/api/skill", skillRouter);
app.use("/api/project", projectRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Welcome to ace.exe!');
});

app.get('*name', (req: Request, res: Response) => {
  res.send(`Can't find ${req.originalUrl} on this server!`);
});

app.use(errorHandler);
export default app;