import express from "express";
import * as authController from "../controllers/auth.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

export { router as authRouter };
