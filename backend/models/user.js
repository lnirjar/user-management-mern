import mongoose from "mongoose";
import { ADMIN, MEMBER } from "../constants.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: [MEMBER, ADMIN], default: MEMBER },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
