import express from "express"
import { deleteOrder, listOrder, order, orderDetails } from "../controllers/order.controllers.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"

const orderRoutes = express.Router()
orderRoutes.post("/place-order",isLoggedIn, order)
orderRoutes.get("/get-order",isLoggedIn,listOrder)
orderRoutes.get("/order-details/:orderId" , isLoggedIn, orderDetails)
orderRoutes.delete("/delete/:orderId" , isLoggedIn, deleteOrder)

export default orderRoutes
