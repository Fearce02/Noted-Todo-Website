import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  CreateUser,
  UpdateUser,
  SigninUser,
} from "../middlewares/UserZodSchema.js";
import { Validate } from "../middlewares/Validate.js";
import authenticate from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/signup", Validate(CreateUser), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res.status(400).json({
        message: " This Email is already registered",
      });
    }

    const pwdHashing = await bcrypt.hash(password, 15);
    const newUser = new User({ username, email, password: pwdHashing });
    await newUser.save();
    res.status(200).json({
      message: " User created Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/signin", Validate(SigninUser), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Invalid Credentials please try again",
      });
    }

    const userMatches = await bcrypt.compare(password, user.password);
    if (!userMatches) {
      res.status(400).json({
        message: "Invalid Credentials please try again",
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.put(
  "/updateUser",
  authenticate,
  Validate(UpdateUser),
  async (req, res) => {
    const { username, password, firstname, lastname } = req.body;

    try {
      const updates = {};

      if (username) updates.username = username;
      if (firstname) updates["info.firstname"] = firstname;
      if (lastname) updates["info.lastname"] = lastname;
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
