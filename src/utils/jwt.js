import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "15m" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  })
}