import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// REGISTER (DB MODE ONLY)
export const registerController = async (req, res, next) => {
  try {
    const { mode, name, username, email, password } = req.body;

    if (mode !== "db") {
      return res
        .status(400)
        .json({ message: "Register allowed only in DB mode" });
    }

    // Check if user or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { name: user.name, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN (Handles Both Modes)
export const loginController = async (req, res, next) => {
  try {
    const { mode, username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // SIMPLE MODE
    if (mode === "simple") {
      if (username !== "admin") {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (password !== "admin") {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      return res.status(200).json({
        message: "Simple Login Successful",
        mode: "simple",
        user: { name: "admin", username: "admin" },
      });
    }

    // DB MODE
    if (mode === "db") {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "DB Login Successful",
        user: { name: user.name, username: user.username, email: user.email },
        token,
      });
    }

    // Invalid mode selected
    return res.status(400).json({
      message: "Invalid mode selected",
    });
  } catch (error) {
    next(error);
  }
};
