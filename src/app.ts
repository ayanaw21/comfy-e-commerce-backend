import express from 'express';
import type  { Application } from "express"
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.route.ts"
import productRouter from "./routes/product.route.ts"
const app: Application = express();

app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,               
}));
app.use(cookieParser());
app.use(express.json());




// Routes would go here
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/products", productRouter);

export default app;