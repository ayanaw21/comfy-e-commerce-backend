import { Router } from "express";
import * as productController from "../controllers/product.controller.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);
router.get("/:id", productController.getSingleProduct);

export default router;
