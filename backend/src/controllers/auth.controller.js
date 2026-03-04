import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// REGISTER (DB MODE ONLY)
export const registerController = async (req, res, next) => {
  try {
    const { mode, name, email, password } = req.body;

    if (mode !== "db") {
      return res.status(400).json({
        message: "Register allowed only in DB mode",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN (Handles Both Modes)
export const loginController = async (req, res, next) => {
  try {
    const { mode, email, password } = req.body;

    // SIMPLE MODE
    if (mode === "simple") {
      if (email === "admin" && password === "admin") {
        return res.status(200).json({
          message: "Simple Login Successful",
          mode: "simple",
        });
      }

      return res.status(401).json({
        message: "Invalid credentials (Simple Mode)",
      });
    }

    // DB MODE
    if (mode === "db") {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "DB Login Successful",
        token,
        mode: "db",
      });
    }

    return res.status(400).json({
      message: "Invalid mode selected",
    });
  } catch (error) {
    next(error);
  }
};
