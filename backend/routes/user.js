import express from "express";
import * as authMiddleware from "../middlewares/auth.js";
import * as userController from "../controllers/user.js";

const router = express.Router();

router.use(authMiddleware.verifyJWT);

router.get("/", userController.getUser);

export { router as userRouter };
