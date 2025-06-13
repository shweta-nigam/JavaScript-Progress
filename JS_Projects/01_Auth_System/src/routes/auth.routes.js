import express from "express"
import { forgotPassword, login, logout, profile, register, resetPassword, verify } from "../controllers/auth.controllers.js"
import { isLoggedIn } from "../middlewares/user.middleware.js"
const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.get("/verify/:v_Token", verify)
authRoutes.post("/login", login)
authRoutes.get("/profile",isLoggedIn, profile)
authRoutes.get("/logout",isLoggedIn, logout)
authRoutes.get("/forgot-password",isLoggedIn, forgotPassword)
authRoutes.get("/reset-password/:token",isLoggedIn, resetPassword)

//EDA->  Event Driven Architecture in node.js, JS DOM

export default authRoutes