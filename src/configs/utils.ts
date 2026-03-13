import jwt from "jsonwebtoken";
import type { Response } from "express";
import { ENV } from "./env.ts";
const { REFRESH_TOKEN_SECRET, NODE_ENV } = ENV;

export const generateTokens = (res: Response, userId: string) => {
	const token = jwt.sign({ userId }, REFRESH_TOKEN_SECRET!, {
		expiresIn: "7d",
	});
	res.cookie("token", token, {
		httpOnly: true,
		secure: NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};
