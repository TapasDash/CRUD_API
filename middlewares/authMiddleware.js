import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select();

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        sucess: false,
        message: "Not authorized",
      });
    }
  }

  if (!token)
    return res.status(401).json({
      sucess: false,
      message: "Not authorized",
    });
});

const Admin = (req, res, next) => {
  if (req.user.userType === "admin") next();
  else
    return res.status(401).json({
      sucess: false,
      message: "Not authorized as an Admin!",
    });
};

export { protect, Admin };
