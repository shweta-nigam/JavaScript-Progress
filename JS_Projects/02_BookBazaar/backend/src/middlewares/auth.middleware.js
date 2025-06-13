import { apiError } from "../utils/apiError.js";
import { db } from "../db/db.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    // get token
    // const { token } = req.cookies;
    // console.log("req.cookies------", req.cookies);
    
    let token = req.cookies?.token
    // console.log("token --", token);

    // console.log("Token Found: ", token ? "YES" : "NO");


    if (!token) {
     return next (new apiError(401, "Authentication failed"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log("decoded  jwt token",decoded)

      if (!decoded) {
        throw new apiError(400, "verification of jwt token failed");
      }

    } catch (error) {
      console.error(error);
      throw new apiError(400, "decoding failed");
    }
 // Attach decoded info to request
    req.user = decoded;

    // console.log("req.user ---------> ", req.user);
    
    
    next();
  } catch (error) {
    console.error("Auth middleware failure",error);
    throw new apiError(500, "Internal server error while decoding jwt token");
  }
//   next();
};

export const isAdmin = async(req,res, next) =>{
const userId = req.user.id  // from isLoggedIn
console.log("userid -----> ",userId);


try {
 const user = await db.user.findUnique({
  where:{id : userId}
 })

  // console.log("user",user);
  
 if(user.role !== "ADMIN"){
 return next(new apiError(400, "Unauthorize - Admin only"))
 }
 next()
} catch (error) {
  console.log(error)
  throw new apiError(500, "Internal error while authorizing user as admin")
}
} 