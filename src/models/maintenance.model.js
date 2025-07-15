import { pool } from "../config/database.config.js";
import { format } from "date-fns";
import { generatePDF } from "../utils/generatePdf.js";

class MaintenanceModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM maintenances");
    return rows;
  }

  static async getByPart({ id }) {
    const [rows] = await pool.query(
      "SELECT m.description, m.date, p.type, m.value FROM maintenances m INNER JOIN periodicities p ON p.id = m.periodicity_id WHERE m.part_id = ?",
      [id]
    );
    return rows;
  }

  static async getCountByPart({ id }) {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS maintenances FROM maintenances WHERE part_id = ?",
      [id]
    );
    return rows;
  }

  static async create({
    date,
    hours_navigation,
    description,
    report,
    result,
    value,
    periodicity_id,
    part_id,
    boat_id,
    evidence,
  }) {
    const [rows] = await pool.query(
      "INSERT INTO maintenances (date, hours_navigation, description, report, result, value, periodicity_id, part_id, boat_id, evidence) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        date,
        hours_navigation,
        description,
        report,
        result,
        value,
        periodicity_id,
        part_id,
        boat_id,
        evidence,
      ]
    );

    return { id: rows.insertId };
  }

  static async generateInvoice({ part, date_start, date_end }) {
    const [rows] = await pool.query(
      "SELECT m.id, m.description, p.name AS part, b.name AS boat, m.hours_navigation, m.value, (m.value + (m.value * 0.19)) AS total FROM maintenances m INNER JOIN parts p ON p.id = m.part_id INNER JOIN boats b ON b.id = m.boat_id WHERE m.part_id = ? AND m.date BETWEEN ? AND ?",
      [part, date_start, date_end]
    );

    const data = {
      date: format(new Date(), "yyyy-MM-dd"),
      maintenances: rows,
    };

    const pdf = await generatePDF(data, "./src/templates/invoice-template.hbs");
    return pdf;
  }
}

export default MaintenanceModel;
