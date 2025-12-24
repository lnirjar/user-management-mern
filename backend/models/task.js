import mongoose from "mongoose";
import { ADMIN, MEMBER } from "../constants.js";
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
