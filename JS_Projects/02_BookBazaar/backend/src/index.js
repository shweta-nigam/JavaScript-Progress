import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

//custom routes
import authRoutes from "./routes/auth.routes.js"
import bookRoutes from "./routes/book.routes.js"
import orderRoutes from "./routes/order.routes.js"
import reviewRoutes from "./routes/review.routes.js"

dotenv.config()

const app = express()

const port = process.env.PORT ?? 8080

app.use(cors({
    origin:process.env.BASE_URL,
    credentials :true,
    methods:["GET","POST","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}))


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
// A middleware function is called before the request is processed. It can change the request object. 

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/book", bookRoutes)
app.use("/api/v1/order", orderRoutes)
app.use("/api/v1/review", reviewRoutes)

app.listen(port, ()=>{
    console.log(`App is successfully running on server ${port} !`);  
} )


// nodemon vs watch


