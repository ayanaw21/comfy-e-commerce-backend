import type { Request, Response } from "express";
import * as orderService from "../services/order.service.ts";
import httpStatus from "http-status";
export const getOrders = async (req: any, res: Response) => {
	try {
		const result = await orderService.getAllOrders(req.query, req.user._id);
		// const length = result.orders.length;
		res.status(httpStatus.OK).json({
			success: true,
			meta: {
				pagination: {
					currentPage: result.currentPage,
					// pageSize: result.orders.length,
					pageCount: result.totalPages,
					total: result.totalOrders,
				},
			},
			data: result.orders,
		});
	} catch (error: any) {
		console.error("Get Orders Error:", error.message);
		return res.status(500).json({ message: error.message || "Internal Server Error" });
	}
};

export const createOrder = async (req: any, res: Response) => {
	try {
		const {
			orderItems,
			numItemsInCart,
			cartTotal,
			tax,
			orderTotal,
			address,
		} = req.body;
		if (!orderItems || orderItems.length === 0) {
			return res.status(httpStatus.BAD_REQUEST).json({
				message: "No order items provided",
			});
		}

		const orderData = {
			user: req.user._id, // From Protect Middleware
			orderItems,
			numItemsInCart,
			cartTotal,
			tax,
			orderTotal,
			address,
			status: "pending",
		};
		const order = await orderService.createOrder(orderData);
		return res.status(httpStatus.CREATED).json({
			success: true,
			message: "Order placed successfully",
			order,
		});
	} catch (error: any) {
		console.error("Create Order Error:", error.message);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Failed to create order",
		});
	}
};
