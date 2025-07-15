import AuthModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";
import "dotenv/config";

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    const user = await AuthModel.login({ username, password });

    const token = await generateToken(user);
    res.cookie("token_boat_maintenance", token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      domain: "boraboraboat.app",
    });

    if (user) return res.json(user);
    res.status(400).json({ message: "User not found" });
  }

  static async verify(req, res) {
    const token = req.cookies.token_boat;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });

      const { username } = decoded;
      const result = await AuthModel.verify(username);

      if (!result) return res.status(404).json({ message: "User not found" });
      if (result) return res.json(result);
    });
  }

  static async logout(req, res) {
    res.clearCookie("token_boat_maintenance", { httpOnly: true, sameSite: "Strict" });
    res.status(400).json({ message: "User logged out" });
  }
}

export default AuthController;
