import type { appJwtPayload } from "./type.jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: appJwtPayload;
    }
  }
}

export {};