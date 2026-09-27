import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/auth.model";
const SECRET_KEY = process.env.JWT_SECRET!;

export const generateToken = (user: TokenPayload): string => {
  return jwt.sign(user, SECRET_KEY, {
    expiresIn: "1d", // Expire dans 1 jour
    algorithm: "HS256", // algorithme de signature
  });
};

export const validateToken = (token: string): TokenPayload | undefined => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    // Token invalide, expiré, etc.
    console.error("Token invalide :", error);
    return undefined;
  }
};
