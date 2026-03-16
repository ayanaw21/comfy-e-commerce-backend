import type { Request, Response } from "express";
import * as userServices from "../services/user.service.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import httpStatus from "http-status";
export const getMe = async (req: any, res: Response) => {
	try {
		const user = await userServices.getCurrentUser(req.user?._id);
		return res.status(httpStatus.OK).json({
			success: true,
			user,
		});
	} catch (error: any) {
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: error.message,
		});
	}
};
