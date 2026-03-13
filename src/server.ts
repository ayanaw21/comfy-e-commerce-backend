import mongoose from 'mongoose';
import app from './app.ts';
import dotenv from 'dotenv';
import http from "http"
import { connectDB } from './configs/db.ts';
import { ENV } from './configs/env.ts';
dotenv.config();

const PORT = ENV.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log("server is run on port", PORT);
	connectDB();
});