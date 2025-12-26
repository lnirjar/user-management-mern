import { Task } from "../models/task.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  const task = await Task.create({ title, description, createdBy: userId });

  res.status(201).json({ task });
};

export const getMyTasks = async (req, res) => {
  const userId = req.user._id;

  const tasks = await Task.find({ createdBy: userId }).exec();

  res.json({ tasks });
};

export const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    const task = await Task.findById(taskId).exec();

    if (!task) {
      throw new Error("Task Not Found");
    }

    if (task.createdBy.toString() !== userId.toString()) {
      throw new Error("You not authorized to view this task");
    }

    res.status(200).json({ task: task });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { taskId } = req.params;
    const userId = req.user._id;

    const task = await Task.findById(taskId).exec();

    if (!task) {
      throw new Error("Task Not Found");
    }

    if (task.createdBy.toString() !== userId.toString()) {
      throw new Error("You not authorized to update this task");
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
      },
      { new: true }
    ).exec();

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    const task = await Task.findById(taskId).exec();

    if (!task) {
      throw new Error("Task Not Found");
    }

    if (task.createdBy.toString() !== userId.toString()) {
      throw new Error("You not authorized to delete this task");
    }

    const deletedTask = await Task.findByIdAndDelete(taskId).exec();

    res.status(200).json({ task: deletedTask });
  } catch (error) {
    res.json({ message: error.message });
  }
};
