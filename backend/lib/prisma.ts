import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'Muhns123',
  database: process.env.DATABASE_NAME || 'informasi_bank_karanganyar',
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export { prisma };