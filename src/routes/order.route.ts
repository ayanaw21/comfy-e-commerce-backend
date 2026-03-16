import { Router } from "express"
import * as OrderController from "../controllers/order.controller.ts"
import { protect } from "../middlewares/auth.middleware.ts"


const router = Router()

router.get("/",protect,OrderController.getOrders)
router.post("/create",protect,OrderController.createOrder)

export default router;