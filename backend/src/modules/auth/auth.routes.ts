import { Router } from "express";
import { loginController } from "./auth.controllers.js";

const authRouter = Router();

authRouter.post("/login", loginController);

export default authRouter;