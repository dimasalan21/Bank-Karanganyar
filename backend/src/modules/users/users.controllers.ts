import type { Request, Response } from "express";
import { createUserSchema, userIdParamSchema } from "./users.schema.js";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  deleteUserService,
} from "./users.services.js";
import { de } from "zod/locales";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: error.message });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await createUserService(data);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const validatedInput = userIdParamSchema.parse(req.params);
    const id = await deleteUserService(validatedInput.id);
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
