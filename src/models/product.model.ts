import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
	title: string;
	company: string;
	description: string;
	featured: boolean;
	category: string; // Or mongoose.Types.ObjectId if referencing the Category model
	image: string;
	price: number;
	shipping: boolean;
	colors: string[];
}

export const productSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		company: {
			type: String,
			required: true,
			index: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			index: true,
		},
		featured: {
			type: Boolean,
			default: false,
			index: true,
		},
		category: {
			type: String,
			required: true,
			index: true,
		},
		image: { type: String, required: true },
		shipping: { type: Boolean, default: false },
		colors: [{ type: String }],
	},
	{
		timestamps: true,
	},
);

productSchema.index({ title: 'text', description: 'text' });

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
