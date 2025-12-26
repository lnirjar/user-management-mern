import { ADMIN } from "../constants.js";

export const isAdmin = async (req, res, next) => {
  const user = req.user;

  if (user.role !== ADMIN) {
    return res.status(403).json({ message: "You are not admin" });
  }

  next();
};
