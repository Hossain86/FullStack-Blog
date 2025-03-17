import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization");
  

  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided." });
    return; // ✅ Explicit return to avoid function hanging
  }

  try {
    const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Securely store this in .env
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
    
    console.log("Raw Token Header:", req.header("Authorization"));
    console.log("Extracted Token:", token.replace("Bearer ", ""));
    console.log("Decoded User:", decoded);


    // Attach user info to request object
    (req as any).user = decoded;

    next(); // ✅ Always call next() if authentication is successful
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
    return; // ✅ Ensure function exits
  }
};
