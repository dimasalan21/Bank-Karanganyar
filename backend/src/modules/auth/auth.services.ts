import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Email tidak ditemukan");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Password salah");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, 
    },
  };
};

export const logoutService = async (token: string) => {
  
};