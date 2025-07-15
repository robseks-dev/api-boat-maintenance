import { pool } from "../config/database.config.js";

class PartModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT id AS `key`, name AS value FROM parts");
    return rows;
  }

  static async getGroup() {
    const [rows] = await pool.query(
      "SELECT p.id, p.name, p.description, p.serial_number, b.id AS boat_id, b.name AS boat FROM parts p LEFT JOIN boats b ON b.id = p.boat_id ORDER BY b.name"
    );
    return rows;
  }

  static async getByBoat({ id }) {
    const [rows] = await pool.query("SELECT * FROM parts WHERE boat_id = ?", [id]);
    return rows;
  }

  static async getKeysByBoat({ id }) {
    const [rows] = await pool.query("SELECT id AS `key`, name AS value FROM parts WHERE boat_id = ?", [id]);
    return rows;
  }

  static async create({ name, description, serial_number, boat_id }) {
    const [result] = await pool.query(
      "INSERT INTO parts (name, description, serial_number, boat_id) VALUES (?, ?, ?, ?)",
      [name, description, serial_number, boat_id]
    );

    return { id: result.insertId, name, description, serial_number, boat_id };
  }

  static async update({ id, name, description, serial_number }) {
    const [result] = await pool.query(
      "UPDATE parts SET name = ?, description = ?, serial_number = ? WHERE id = ?",
      [name, description, serial_number, id]
    );

    return result.affectedRows;
  }

  static async delete({ id }) {
    const [result] = await pool.query("DELETE FROM parts WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default PartModel;
