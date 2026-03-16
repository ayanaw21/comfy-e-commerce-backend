import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../configs/env.js";
import type { IUser } from "../models/user.model.js";
import User from "../models/user.model.js";
import httpStatus from "http-status";
export interface AuthRequest extends Request {
	user?: IUser;
}
export const protect = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(httpStatus.UNAUTHORIZED).json({
			message: "Not authorized, no token found",
		});
	}

	try {
		const decoded = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET!) as {
			userId: string;
		};
		req.user = await User.findById(decoded.userId).select("-password");

		if (!req.user) {
			return res
				.status(httpStatus.UNAUTHORIZED)
				.json({ message: "User not found" });
		}

		next();
	} catch (error) {}
};
