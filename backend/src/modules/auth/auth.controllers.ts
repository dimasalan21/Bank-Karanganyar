import type { Request, Response } from "express";
import { loginSchema } from "./auth.schema.js";
import { loginService } from "./auth.services.js";

export const loginController = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.parse(req.body);

    const result = await loginService(parsed.email, parsed.password);

    res.json({
      message: "Login berhasil",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};