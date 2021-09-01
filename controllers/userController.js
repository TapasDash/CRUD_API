import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, userType } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({
      sucess: false,
      message: "User already exists!",
    });

  const user = await User.create({
    name,
    email,
    password,
    userType,
  });

  if (user)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      token: generateToken(user._id),
    });
  else
    return res.status(400).json({
      sucess: false,
      message: "Invaid data!",
    });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      outlet: user.outlet,
      dealership: user.dealership,
      role: user.__t,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

export { registerUser, authUser };
