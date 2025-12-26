import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(401).json({ message: "Name is reqired" });
  }
  if (!email) {
    return res.status(401).json({ message: "Email is reqired" });
  }
  if (!password) {
    return res.status(401).json({ message: "Password is reqired" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash });

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET
  );

  res.cookie("jwt_token", token);
  res.status(201).json({ user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(401).json({ message: "Email is reqired" });
  }
  if (!password) {
    return res.status(401).json({ message: "Password is reqired" });
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET
  );

  res.cookie("jwt_token", token);
  res.status(200).json({ user });
};

export const logout = async (req, res) => {
  res.clearCookie("jwt_token");
  res.json({ message: "Logout successful" });
};
