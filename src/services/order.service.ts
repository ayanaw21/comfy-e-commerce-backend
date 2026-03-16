import Order, { type IOrder } from "../models/order.model.js";

export const getAllOrders = async (query: any, userId: string) => {
	const page = Number(query.page) || 1;
	const limit = Number(query.limit) || 10;
	const skip = (page - 1) * limit;
	const filter: any = {};
	if (userId) filter.user = userId;
	const orders = Order.findOne(filter)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean();
	const totalOrders = await Order.countDocuments(filter);

	return {
		orders,
		totalOrders,
		totalPages: Math.ceil(totalOrders / limit),
		currentPage: page,
	};
};

export const createOrder = async (orderData: Partial<IOrder>) => {
	const newOrder = await Order.create(orderData);
	return newOrder;
};
