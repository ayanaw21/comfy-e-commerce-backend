import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts";
import { ENV } from "../configs/env.ts";
import httpStatus from "http-status";

import * as authService from "../services/auth.service.ts";
import { generateTokens } from "../configs/utils.ts";
export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, username } = req.body;

		if (!email || !username || !password) {
			return res
				.status(httpStatus.BAD_REQUEST)
				.json({ message: "All fields are required" });
		}
		if (password.length < 8) {
			return res
				.status(httpStatus.BAD_REQUEST)
				.json({ message: "Password must be grater than 8" });
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res
				.status(httpStatus.BAD_REQUEST)
				.json({ message: "Invalid email format" });
		}
		const user = await authService.register(req.body);
		generateTokens(res, user._id.toString());

		return res.status(httpStatus.CREATED).json({
			success: true,
			message: "User created successfully",
			user: {
				id: user._id,
				fullName: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error: any) {
		console.error("Registration Error:", error.message);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Internal Server Error",
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(httpStatus.BAD_REQUEST)
				.json({ message: "All fields are required" });
		}

		const user = await authService.login(req.body);
		generateTokens(res, user._id.toString());
		return res.status(200).json({
			success: true,
			message: "User logged in successfully",
			user: {
				id: user._id,
				fullName: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error: any) {
		console.error("Registration Error:", error.message);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Internal Server Error",
		});
	}
};
