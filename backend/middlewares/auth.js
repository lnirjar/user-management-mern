import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const { jwt_token } = req.cookies;
    const { userId } = jwt.verify(jwt_token, process.env.JWT_SECRET);

    if (!userId) {
      throw new Error("userId not found");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.json({ message: "You are not logged in" });
    console.error(error);
  }
};
