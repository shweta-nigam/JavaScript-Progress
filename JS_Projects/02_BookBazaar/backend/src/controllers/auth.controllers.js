import { db } from "../db/db.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmailVerification } from "../utils/mail.js";
import { error } from "console";

export const register = async (req, res) => {

  const { name, email, password } = req.body;
 

  // confirmation of data
  if (!name || !email || !password) {
    throw new apiError(404, "All fields are required!");
  }

  //validation
  if (password.length < 6 || !password) {
    throw new apiError(400, "Password should contain at least 6 characters");
  }
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    throw new apiError(400, "Password must contain both letters and numbers");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new apiError(400, "Please enter a valid email address");
  }

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new apiError(403, "User already exits");
    }

  
    const hashedPassword = await bcrypt.hash(password, 16);
    console.log("has pass -> ", hashedPassword);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    console.log("verification token :", verificationToken);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken,
      },
    });
    console.log("new user -> ", newUser);

    //email
    // sendEmailVerification(newUser.email, verificationToken);

    res.status(201).json(new apiResponse(201, "User registered successfully"));
  } catch (error) {
    console.error("User registration failed-------", error);
    throw new apiError(500, "User registration failed", error);
  }
};

export const verify = async (req, res) => {
 
  const { v_Token } = req.params;
  console.log("v-token", v_Token);

  if (!v_Token) {
    throw new apiError(400, "Token not found", error);
  }

  try {
    
    const user = await db.user.findFirst({
      where: {
        verificationToken: v_Token,
      },
    });
    console.log("user -----", user);

    if (!user) {
      throw new apiError(400, "user not found");
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        verificationToken: null,
        isVerified: true,
      },
    });

    res.status(200).json(new apiResponse(200, "user verified successfully"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "user verification failed");
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "All fields are required");
  }

  try {
    
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      throw new apiError(400, "user not found");
    }

    
    if (user.isVerified !== true) {
      throw new apiError(400, "Please verify your account.");
    }

    // match password
    const isMatch = bcrypt.compare(password, user.password);

 
    if (!isMatch) {
      throw new apiError(400, "Invalid credentials");
    }

   
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    console.log("jwt token ", token);

    
    const cookieOptions = {
      httpOnly: true, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      secure: process.env.NODE_ENV !== "development", 
    };
  
    res.cookie("token", token, cookieOptions);

    res.status(200).json(new apiResponse(200, "User logged in successfully. "));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "user login failed", error);
  }
};

export const profile = async (req, res) => {
 
  try {
    const user = await db.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return res
      .status(200)
      .json(new apiResponse(200, user, "use profile successfully loaded"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Error while fetching user profile");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res
      .status(200)
      .json(new apiResponse(200, null, "user logged successfully."));
  } catch (error) {
    throw new apiError(500, "Error while logging out user.");
  }
};

export const forgotPassword = async (req, res) => {
  // get email data
  const { email } = req.body;
  console.log(email);

  if (!email) {
    throw new apiError(400, "email is required");
  }

  try {
    //find email

    let user = await db.user.findUnique({
      where: {email}
    });

    if (!user) {
      throw new apiError("user not found");
    }

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24) ; // 24h

    //send email

    // sendEmailVerification(user.email, resetToken)

    // update user schema

    user = await db.user.update({
      where: { id: req.user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetTokenExpiry: tokenExpires,
      },
    });

    console.log(user);

    return res
      .status(200)
      .json(new apiResponse(200, email, "verification to set password"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal Error while finding password");
  }
};



export const resetPassword = async (req, res) => {
  //get token from email
  const { token } = req.params;
  // new password
  const {password } = req.body

  if (!token) {
    throw new apiError(400, "token not found");
  }
  if(!password){
    throw new apiError(400,"password is required")
  }
  try {
    // find user based on reset token
    let user = await db.user.findFirst({
      where: { passwordResetToken : token }
    });

    if (!user) {
      throw new apiError(404, "Invalid or expired token");
    }

// hash password before update
const hashedPassword =  await bcrypt.hash(password,10)

    user = await db.user.update({
      where: { id  : user.id},
      data: {
        password: hashedPassword,
        passwordResetToken: null,  // why null ? ---> This is intentional. You’re not saying, “I forgot to assign this,” but rather, “I am removing it.”


        passwordResetTokenExpiry:null
      },
      select: {
        id:true,
        email:true
      }
    });

    return res
      .status(200)
      .json(new apiResponse(200, user, "password reset successfully."));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal Error while resetting password");
  }
};


export const generateApiKey = async (req,res) => {
  const userId = req.user.id

  try {
    const apiKey = crypto.randomBytes(32).toString("hex")

    const newApiKey = await db.apiKey.create({
     data:{
      key:apiKey,
      isActive:true,
      owner:{
        connect:{ id: userId}
      }
     },
     select:{
      key:true
     }
    })

    return res
      .status(201)
      .json(new apiResponse(201, newApiKey, "Api key generated successfully"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal Error while generating api key");
  }
}



// what does new Date(0)  gives ? interview question


// jwt is stateless

// iat and exp in decoded token - > search
