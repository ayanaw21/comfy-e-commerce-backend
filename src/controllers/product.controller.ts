import type { Response, Request } from "express";
import * as productService from "../services/product.service.js";

import httpStatus from "http-status";
import type { IProduct } from "../models/product.model.js";

export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const result = await productService.getProducts(req.query);
		return res.status(httpStatus.OK).json({
			success: true,
			meta: {
				pagination: {
					page: result.currentPage,
					pageSize: result.products.length,
					pageCount: result.totalPages,
					total: result.totalProducts,
				},
				categories: result.categories,
				companies: result.companies,
			},
			data: result.products,
		});
	} catch (error: any) {
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			message: error.message,
		});
	}
};

export const getSingleProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await productService.getProductById(id as string);

		if (!product) {
			return res.status(httpStatus.NOT_FOUND).json({
				success: false,
				message: "Product not found",
			});
		}
		return res.status(httpStatus.OK).json({
			success: true,
			data: product,
		});
	} catch (error: any) {
		return res.status(httpStatus.BAD_REQUEST).json({
			message: "Invalid Product ID format",
		});
	}
};
export const addProduct = async (req: Request, res: Response) => {
	try {
		// const { title, price, image, category, company, description } =
		// 	req.body;
		// if (
		// 	!title ||
		// 	!price ||
		// 	!image ||
		// 	!category ||
		// 	!company ||
		// 	!description
		// ) {
		// 	return res.status(httpStatus.BAD_REQUEST).json({
		// 		success: false,
		// 		message:
		// 			"Please provide all required fields: title, price, image, category, company, description",
		// 	});
		// }
		// const product = await productService.createProduct(req.body);

		// // 3. Return success
		// return res.status(httpStatus.CREATED).json({
		// 	success: true,
		// 	message: "Product created successfully",
		// 	data: product,
		// });

		const data = req.body;

		// 1. Basic Validation for Array
		if (Array.isArray(data)) {
			if (data.length === 0) {
				return res
					.status(httpStatus.BAD_REQUEST)
					.json({ message: "Array cannot be empty" });
			}
		} else {
			// Basic Validation for Single Object
			if (!data.title || !data.price) {
				return res
					.status(httpStatus.BAD_REQUEST)
					.json({ message: "Missing required fields" });
			}
		}

		// 2. Call the Service
		const result = await productService.createProduct(data);

		return res.status(httpStatus.CREATED).json({
			success: true,
			count: Array.isArray(result) ? result.length : 1,
			data: result,
		});
	} catch (error: any) {
		console.error("Add Product Error:", error);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message || "Failed to create product",
		});
	}
};
