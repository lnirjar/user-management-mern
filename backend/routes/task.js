import express from "express";
import * as authMiddleware from "../middlewares/auth.js";
import * as taskController from "../controllers/task.js";

const router = express.Router();

router.use(authMiddleware.verifyJWT);

router.post("/", taskController.createTask);

router.get("/my", taskController.getMyTasks);

router
  .route("/:taskId")
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

export { router as taskRouter };
