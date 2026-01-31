import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "memohealth_secret_key_molto_sicura_2025";
// Interfaccia per il payload del token
interface UserPayload {
  id: number;
  nome: string;
  cognome: string;
  codice_fiscale: string;
}

export const setAccessToken = (req: Request, res: Response, user: UserPayload) => {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
  // Imposta il cookie "accessToken" sul client
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax"
  });
};

export const decodeAccessToken = (req: Request, res: Response): UserPayload | null => {
  const token = req.cookies.accessToken;
  
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
};

export const deleteAccessToken = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
};