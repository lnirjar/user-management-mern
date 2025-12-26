import express from "express";
import * as authMiddleware from "../middlewares/auth.js";
import * as adminMiddleware from "../middlewares/admin.js";
import * as adminController from "../controllers/admin.js";

const router = express.Router();

router.use(authMiddleware.verifyJWT);
router.use(adminMiddleware.isAdmin);

router.get("/users", adminController.getAllUsers);

router.get("/users/:userId/tasks", adminController.getTasksByUser);

export { router as adminRouter };
