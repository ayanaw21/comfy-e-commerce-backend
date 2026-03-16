import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import http from "http";
import { connectDB } from "./configs/db.js";
import { ENV } from "./configs/env.js";
dotenv.config();

const PORT = ENV.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log("server is run on port", PORT);
	connectDB();
});
