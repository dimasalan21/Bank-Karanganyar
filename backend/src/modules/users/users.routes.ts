import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
} from "./users.controllers.js";

const usersRouter = Router();

usersRouter.get("/getAllUsers", getAllUsersController);
usersRouter.post("/createUser", createUserController);
usersRouter.delete("/deleteUser/:id", deleteUserController);

export default usersRouter;