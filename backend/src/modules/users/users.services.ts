import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import type { UserIdParam } from "./users.schema.js";

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return users;
};

export const getUserByIdService = async (id: number) => {};

export const createUserService = async (data: any) => {
  const { name, email, password, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("Email sudah digunakan");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
};

export const updateUserService = async (id: number, data: any) => {};

export const deleteUserService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  await prisma.user.delete({
    where: { id },
  });
};
