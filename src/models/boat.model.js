import { pool } from "../config/database.config.js";

class BoatModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT id AS `key`, name AS value FROM boats");
    return rows;
  }

  static async getGroup() {
    const [rows] = await pool.query("SELECT * FROM boats");
    return rows;
  }

  static async create({ name, registration_number, brand, model, year, plate }) {
    const [result] = await pool.query(
      "INSERT INTO boats (name, registration_number, brand, model, year, plate) VALUES (?, ?, ?, ?, ?, ?)",
      [name, registration_number, brand, model, year, plate]
    );

    return { id: result.insertId, name, registration_number, brand, model, year, plate };
  }

  static async update({ id, name, registration_number, brand, model, year, plate }) {
    const [result] = await pool.query(
      "UPDATE boats SET name = ?, registration_number = ?, brand = ?, model = ?, year = ?, plate = ? WHERE id = ?",
      [name, registration_number, brand, model, year, plate, id]
    );

    return result.affectedRows;
  }

  static async delete({ id }) {
    const [result] = await pool.query("DELETE FROM boats WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default BoatModel;
