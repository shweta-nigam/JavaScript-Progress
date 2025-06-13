import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    // get token
    // const { token } = req.cookies;
    console.log("req.cookies------", req.cookies);
    
    let token = req.cookies?.token
    console.log("token --", token);

    console.log("Token Found: ", token ? "YES" : "NO");


    if (!token) {
     return next (new apiError(401, "Authentication failed"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("decoded  jwt token",decoded)

      if (!decoded) {
        throw new apiError(400, "verification of jwt token failed");
      }

    } catch (error) {
      console.error(error);
      throw new apiError(400, "decoding failed");
    }
 // Attach decoded info to request
    req.user = decoded;

    console.log("req.user ---------> ", req.user);
    
    
    next();
  } catch (error) {
    console.error("Auth middleware failure",error);
    throw new apiError(500, "Internal server error while decoding jwt token");
  }
//   next();
};
