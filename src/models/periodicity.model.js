import { pool } from "../config/database.config.js";

class PeriodicityModel {
  static async getAll() {
    const [rows] = await pool.query(
      "SELECT p.id, pa.name, p.description, p.date, p.type, p.periodicity, pa.id AS part_id, b.id AS boat_id FROM periodicities_parts pp INNER JOIN periodicities p ON pp.periodicity_id = p.id INNER JOIN parts pa ON pp.part_id = pa.id INNER JOIN boats b ON b.id = pa.boat_id"
    );
    return rows;
  }

  static async create({ description, date, periodicity, type, parts }) {
    const [result] = await pool.query(
      "INSERT INTO periodicities (description, date, periodicity, type) VALUES (?, ?, ?, ?)",
      [description, date, periodicity, type]
    );

    await Promise.all(
      parts.map(async (part) => {
        await pool.query(
          "INSERT INTO periodicities_parts (periodicity_id, part_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE periodicity_id = periodicity_id, part_id = part_id",
          [result.insertId, part.id]
        );
      })
    );

    return { id: result.insertId, description, date, periodicity, type };
  }
}

export default PeriodicityModel;
