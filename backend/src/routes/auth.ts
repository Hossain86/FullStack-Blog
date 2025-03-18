import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthenticatedRequest } from "../@types/express";
import cookieParser from "cookie-parser";  // ✅ Required for cookies
import RefreshTokenModel from "../models/RefreshToken"; // ✅ Store refresh tokens

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

router.use(cookieParser()); // ✅ Add middleware

// **User Login with Refresh Token**
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Generate Access & Refresh Tokens
    const accessToken = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // ✅ Save Refresh Token to DB
    await RefreshTokenModel.create({ userId: user._id, token: refreshToken });

    // ✅ Store Refresh Token in Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // 🔹 Use 'true' in production with HTTPS
      sameSite: "strict",
    });

    res.json({ accessToken, user: { id: user._id, username: user.username, email: user.email } });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// **Refresh Token Endpoint**
router.post("/refresh-token", async (req: Request, res: Response) : Promise<any>=> {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({ message: "Refresh token missing" });

    // ✅ Check if the refresh token exists in the database
    const storedToken = await RefreshTokenModel.findOne({ token: refreshToken });
    if (!storedToken) return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, JWT_SECRET, async (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ accessToken: newAccessToken });
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// **Logout Endpoint**
router.post("/logout", async (req: Request, res: Response): Promise<any> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

    // ✅ Delete refresh token from DB
    await RefreshTokenModel.deleteOne({ token: refreshToken });

    // ✅ Clear cookie
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
