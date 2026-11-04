import express from 'express';
import authRouter from './routes/auth.route.js';
import profileRouter from './routes/profile.route.js';
import cookieParser from 'cookie-parser';
import {errorHandler} from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, and Welcome to ace.exe!');
});

app.use("/api/auth", authRouter);
app.use("/api/user", profileRouter);

app.use(errorHandler);
export default app;