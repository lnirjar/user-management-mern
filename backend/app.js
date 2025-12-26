import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { taskRouter } from "./routes/task.js";
import { adminRouter } from "./routes/admin.js";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/admin", adminRouter);

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
