import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import {
  CreateUser,
  UpdateUser,
  SigninUser,
} from "../middlewares/UserZodSchema.js";
import { Validate } from "../middlewares/Validate.js";
import authenticate from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/signup", Validate(CreateUser), async (req, res) => {
  const { email, password } = req.body;

  try {
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res.status(400).json({
        message: " This Email is already registered",
      });
    }

    const pwdHashing = await bcrypt.hash(password, 15);
    const newUser = new User({ email, password: pwdHashing });
    await newUser.save();
    res.status(200).json({
      message: " User created Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/signin", Validate(SigninUser), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials please try again",
      });
    }

    const userMatches = await bcrypt.compare(password, user.password);
    if (!userMatches) {
      return res.status(400).json({
        message: "Invalid Credentials please try again",
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({
      token: jwtToken,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put(
  "/updateUser",
  authenticate,
  Validate(UpdateUser),
  async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    if (username) {
      const existingUser = await User.findOne({ username: username.trim() });

      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(409).json({ message: "Username is already taken." });
      }
    }

    try {
      const updates = {};

      if (username) updates.username = username;
      if (firstName) updates.firstName = firstName;
      if (lastName) updates.lastName = lastName;
      if (password) {
        const hashedPwd = await bcrypt.hash(password, 15);
        updates.password = hashedPwd;
      }

      const UpdatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: updates,
        },
        {
          new: true,
        }
      ).select("-password");

      res.status(200).json({
        message: "User Info Updated",
        user: UpdatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating the User",
        error,
      });
    }
  }
);

export default router;
