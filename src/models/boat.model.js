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

  static async create({
    name,
    enrollment,
    port_registry,
    arching,
    distinctive,
    omi_number,
    cataloging,
    length,
    date,
  }) {
    const [result] = await pool.query(
      "INSERT INTO boats (name, enrollment, port_registry, arching, distinctive, omi_number, cataloging, length, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, enrollment, port_registry, arching, distinctive, omi_number, cataloging, length, date]
    );

    return {
      id: result.insertId,
      name,
      enrollment,
      port_registry,
      arching,
      distinctive,
      omi_number,
      cataloging,
      length,
      date,
    };
  }

  static async update({
    id,
    name,
    enrollment,
    port_registry,
    arching,
    distinctive,
    omi_number,
    cataloging,
    length,
    date,
  }) {
    const [result] = await pool.query(
      "UPDATE boats SET name = ?, enrollment = ?, port_registry = ?, arching = ?, distinctive = ?, omi_number = ?, cataloging = ?, length = ?, date = ? WHERE id = ?",
      [
        name,
        enrollment,
        port_registry,
        arching,
        distinctive,
        omi_number,
        cataloging,
        length,
        date,
        id,
      ]
    );

    return result.affectedRows;
  }

  static async delete({ id }) {
    const [result] = await pool.query("DELETE FROM boats WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default BoatModel;
