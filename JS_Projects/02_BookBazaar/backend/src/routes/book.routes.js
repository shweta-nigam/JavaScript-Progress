import express from "express"
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js"
import { addBook, allBooks, bookDetails, deleteBook, updateBook } from "../controllers/book.controllers.js"

const bookRoutes = express.Router()

bookRoutes.post("/add-book", isLoggedIn, isAdmin, addBook)
bookRoutes.get("/all-books", allBooks)
bookRoutes.get("/get-book-details/:bookId", bookDetails)
bookRoutes.put("/update-book/:bookId", isLoggedIn, isAdmin, updateBook)
bookRoutes.delete("/delete-book/:bookId", isLoggedIn, isAdmin, deleteBook)

export default bookRoutes