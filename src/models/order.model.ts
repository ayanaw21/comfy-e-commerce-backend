import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
	product: mongoose.Types.ObjectId;
	title: string;
	image: string;
	price: number;
	amount: number;
	color: string;
	cartId: string;
}

export interface IOrder extends Document {
	user: mongoose.Types.ObjectId;
	cartItems: IOrderItem[];
	numItemsInCart: number;
	cartTotal: number;
	// shipping: number;
	orderTotal: number;
	address: string;
	// status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
	createdAt: Date;
	updatedAt: Date;
}

const orderSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		orderItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				image: { type: String, required: true },
				title: { type: String, required: true },
				amount: { type: Number, required: true },
				price: { type: String, required: true },
				color: { type: String, required: true },
				cartId: { type: String, required: true },
			},
		],
		numItemsInCart: { type: Number, required: true },
		cartTotal: { type: Number, required: true },
		// shipping:{type:Number,default:500},
		tax: { type: Number, required: true },
		orderTotal: { type: Number, required: true },
		address: { type: String, required: true },
	},
	{ timestamps: true },
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
