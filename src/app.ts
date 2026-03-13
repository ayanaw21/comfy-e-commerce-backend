import express from 'express';
import type  { Application } from "express"
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.route.ts"
const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());




// Routes would go here
app.use('/api/v1/auth', authRouter);

export default app;