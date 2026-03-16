import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.route.js";
import { ENV } from "./configs/env.js";
const app: Application = express();

app.use(helmet());
app.use(
	cors({
		origin:ENV.CLIENT_URL,
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(express.json());

// Routes would go here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

export default app;
