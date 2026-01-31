import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from "../utils/auth";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = decodeAccessToken(req, res);
  
  if (!user) {
    return res.status(401).json({ error: "Autenticazione richiesta" });
  }
  
  (req as any).user = user;
  next();
};