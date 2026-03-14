import {Router} from "express"
import { login, logout, register } from "../controllers/auth.controller.ts"
import { protect } from "../middlewares/auth.middleware.ts"
import { getMe } from "../controllers/user.controller.ts"

const router = Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/me", protect, getMe);
export default router;