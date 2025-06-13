import express from "express"
import { addReview, deleteReview, listReview } from "../controllers/review.controllers.js"
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js"

const reviewRoutes = express.Router()

reviewRoutes.post("/add-review/:bookId",isLoggedIn , addReview)
reviewRoutes.get("/:bookId/reviews", isLoggedIn,listReview)
reviewRoutes.delete("/delete-review/:id", isLoggedIn , isAdmin, deleteReview)

export default reviewRoutes