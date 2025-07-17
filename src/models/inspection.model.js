import { pool } from "../config/database.config.js";
import { format } from "date-fns";
import { generatePDF } from "../utils/generatePdf.js";

class InspectionModel {
  static async getBoatToday() {
    const [rows] = await pool.query("SELECT * FROM inspection_boat WHERE date = ?", [
      format(new Date(), "yyyy-MM-dd"),
    ]);

    return rows;
  }

  static async getBoatByDate({ date }) {
    const [rows] = await pool.query(
      "SELECT * FROM inspection_boat WHERE DATE_FORMAT(date, '%Y-%m-%d') = ?",
      [date]
    );

    const grouped = rows.reduce((acc, item) => {
      const key = item.title;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    const pdf = await generatePDF(grouped, "./src/templates/report-template.hbs");
    return pdf;
  }

  static async getPassengerToday() {
    const [rows] = await pool.query("SELECT * FROM inspection_passenger WHERE date = ?", [
      format(new Date(), "yyyy-MM-dd"),
    ]);

    return rows;
  }

  static async getPassengerByDate({ date }) {
    const [rows] = await pool.query(
      "SELECT * FROM inspection_passenger WHERE DATE_FORMAT(date, '%Y-%m-%d') = ?",
      [date]
    );

    const grouped = rows.reduce((acc, item) => {
      const key = item.title;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    const pdf = await generatePDF(grouped, "./src/templates/report-template.hbs");
    return pdf;
  }

  static async createBoat({ title, description, value, date }) {
    const [result] = await pool.query(
      "INSERT INTO inspection_boat (title, description, value, date) VALUES (?, ?, ?, ?)",
      [title, description, value, date]
    );

    return { id: result.insertId, title, description, value, date };
  }

  static async createPassenger({ title, description, value }) {
    const [result] = await pool.query(
      "INSERT INTO inspection_passenger (title, description, value) VALUES (?, ?, ?)",
      [title, description, value]
    );

    return { id: result.insertId, title, description, value };
  }

  static async createAccident({
    boat_id,
    description,
    operation,
    immediate_action,
    corrective_action,
    username,
  }) {
    const [result] = await pool.query(
      "INSERT INTO inspection_accidents (boat_id, description, operation, immediate_action, corrective_action, username) VALUES (?, ?, ?, ?, ?, ?)",
      [boat_id, description, operation, immediate_action, corrective_action, username]
    );

    return {
      id: result.insertId,
      boat_id,
      description,
      operation,
      immediate_action,
      corrective_action,
      username,
    };
  }
}

export default InspectionModel;
