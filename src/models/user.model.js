import { pool } from "../config/database.config.js";
import { hashPassword } from "../utils/hashPassword.js";
import { randomUUID } from "node:crypto";

class UserModel {
  static async create({ name, username, password, type }) {
    const id = randomUUID();
    const hashedPassword = await hashPassword(password);

    await pool.query(
      "INSERT INTO users (id, name, username, password, type) VALUES (?, ?, ?, ?, ?)",
      [id, name, username, hashedPassword, type]
    );

    return { id, name, username, type };
  }
}

export default UserModel;
