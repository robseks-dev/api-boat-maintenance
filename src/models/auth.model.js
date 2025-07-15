import { pool } from "../config/database.config.js";
import { comparePassword } from "../utils/hashPassword.js";

class AuthModel {
  static async login({ username, password }) {
    const [rows] = await pool.query(
      "SELECT name, username, password, type FROM users WHERE username = ?",
      [username]
    );

    const isValid = rows[0] ? await comparePassword(password, rows[0].password) : false;
    const { password: hashedPassword, ...user } = rows[0] || {};

    return isValid ? user : null;
  }

  static async verify(username) {
    const [rows] = await pool.query("SELECT name, username, type FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0] || null;
  }
}

export default AuthModel;
