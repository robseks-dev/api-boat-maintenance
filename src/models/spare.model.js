import { pool } from "../config/database.config.js";

class SpareModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM spares");
    return rows;
  }

  static async create({ name, description, type, quantity, location, value, entry_date, status }) {
    const [result] = await pool.query(
      "INSERT INTO spares (name, description, type, quantity, location, value, entry_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, type, quantity, location, value, entry_date, status]
    );

    return {
      id: result.insertId,
      description,
      type,
      quantity,
      location,
      value,
      entry_date,
    };
  }

  static async update({
    id,
    name,
    description,
    type,
    quantity,
    location,
    value,
    entry_date,
    status,
  }) {
    const [result] = await pool.query(
      "UPDATE spares SET name = ?, description = ?, type = ?, quantity = ?, location = ?, value = ?, entry_date = ?, status = ? WHERE id = ?",
      [name, description, type, quantity, location, value, entry_date, status, id]
    );

    return result.affectedRows;
  }

  static async delete({ id }) {
    const [result] = await pool.query("DELETE FROM spares WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default SpareModel;
