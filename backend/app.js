import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

import { User } from "./models/user.js";
import { Task } from "./models/task.js";
import { ADMIN } from "./constants.js";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/register", async (req, res) => {
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
});

app.post("/api/login", async (req, res) => {
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
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("jwt_token");
  res.json({ message: "Logout successful" });
});

app.use(async (req, res, next) => {
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
});

// PROTECTED
app.get("/api/dashboard", async (req, res) => {
  const user = req.user;
  res.json({ user });
});

app.post("/api/tasks", async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  const task = await Task.create({ title, description, createdBy: userId });

  res.status(201).json({ task });
});

app.get("/api/tasks/my", async (req, res) => {
  const userId = req.user._id;

  const tasks = await Task.find({ createdBy: userId }).exec();

  res.json({ tasks });
});

app
  .route("/api/tasks/:taskId")
  .get(async (req, res) => {
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
  })
  .patch(async (req, res) => {
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
  })
  .delete(async (req, res) => {
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

      res.status(201).json({ task: deletedTask });
    } catch (error) {
      res.json({ message: error.message });
    }
  });

// ADMIN routes
app.use(async (req, res, next) => {
  const user = req.user;

  if (user.role !== ADMIN) {
    return res.status(403).json({ message: "You are not admin" });
  }

  next();
});

app.get("/api/admin/users", async (req, res) => {
  const users = await User.find({}).exec();

  res.json({ users });
});

app.get("/api/admin/users/:userId/tasks", async (req, res) => {
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
});

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
