import express, { Router } from "express";
import authRouter from "../modules/auth/auth.routes.js";
import usersRouter from "../modules/users/users.routes.js";

const router : Router = express.Router();
router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;