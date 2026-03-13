import Product, { type IProduct } from "../models/product.model.ts";

export const getProducts = async (filters: any) => {
	const {
		search,
		category,
		company,
		order,
		price,
		shipping,
		featured,
		page = 1,
		limit = 10,
	} = filters;

	const queryObject: any = {};
	if (search) {
		queryObject.title = { $regex: search, $options: "i" };
	}
	if (category && category !== "all") {
		queryObject.category = category;
	}
	if (company && company !== "all") {
		queryObject.company = company;
	}
	if (price) {
		queryObject.price = { $lte: Number(price) };
	}
	if (shipping === "on") {
		queryObject.shipping = true;
	}
	if (featured) {
		queryObject.featured = true;
	}
	let sortOptions = "";
	switch (order) {
		case "a-z":
			sortOptions = "title";
			break;
		case "z-a":
			sortOptions = "-title";
			break;
		case "high":
			sortOptions = "-price";
			break;
		case "low":
			sortOptions = "price";
			break;
		default:
			sortOptions = "-createdAt";
			break;
	}

	const skip = (Number(page) - 1) * Number(limit);
	const products = await Product.find(queryObject)
		.sort(sortOptions)
		.skip(skip)
		.limit(Number(limit));

	const totalProducts = await Product.countDocuments(queryObject);
	const uniqueCategories = await Product.distinct('category')
	const uniqueCompanies = await Product.distinct('company')
	return {
		products,
		totalProducts,
		totalPages: Math.ceil(totalProducts / Number(limit)),
		currentPage: Number(page),
		categories: ['all', ...uniqueCategories],
        companies: ['all', ...uniqueCompanies],
	};
};

export const getProductById = async(id:string)=>{
	const product = await Product.findById(id)
	return product;
}

export const createProduct = async (productData:Partial<IProduct>| Partial<IProduct[]>)=>{
	// const product = new Product(productData);
    // await product.save();
	const products = await Product.insertMany(
        Array.isArray(productData) ? productData : [productData]
    );
    return products;
    // return product;
}

