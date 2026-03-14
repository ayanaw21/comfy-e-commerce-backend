import type { Request, Response,  } from "express";
import * as userServices from "../services/user.service.ts"
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import httpStatus from "http-status"
export const getMe = async (req:AuthRequest,res:Response)=>{
    try {
        const user = await userServices.getCurrentUser(req.user?._id)
        return res.status(httpStatus.OK).json({
            success: true,
            user
        });
    } catch (error:any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}