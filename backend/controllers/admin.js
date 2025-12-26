import { User } from "../models/user.js";
import { Task } from "../models/task.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).exec();

  res.json({ users });
};

export const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).exec();

    if (!user) {
      throw new Error("User not found");
    }

    const tasks = await Task.find({ createdBy: userId }).exec();

    res.json({ tasks, user });
  } catch (error) {
    res.json({ message: error.message });
  }
};
