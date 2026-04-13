import type { JwtPayload } from "jsonwebtoken";

export interface appJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
}