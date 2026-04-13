import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "USER"], "Role must be either 'ADMIN' or 'USER'"),
});

export const userIdParamSchema = z.object({
  id: z.coerce.number()
});

export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
